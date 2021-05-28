<template>
  <v-app>
    <v-app-bar app color="indigo darken-2" dark dense>
      <v-btn icon @click="$router.push('/')" title="返回照片库">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>照片</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon :disabled="!photo">
        <v-icon color="red">mdi-heart</v-icon>
      </v-btn>

      <v-btn icon :disabled="!photo" @click.stop="drawer = true; drawerType = 'info'" title="照片信息">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
      <v-btn icon :disabled="!photo" @click.stop="drawer = true; drawerType = 'face'" title="人脸识别">
        <v-icon>mdi-face</v-icon>
      </v-btn>
      <v-btn icon :disabled="!photo" @click.stop="drawer = true; drawerType = 'search'" title="以图搜图">
        <v-icon>mdi-image-search</v-icon>
      </v-btn>
      <v-btn icon :disabled="!photo" @click.stop="drawer = true; drawerType = 'tags'" title="智能标签">
        <v-icon>mdi-tag-multiple</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list min-width="96" dense>
          <v-list-item @click="() => {}">
            <v-list-item-title>编辑此照片</v-list-item-title>
          </v-list-item>
          <v-list-item @click="() => {}">
            <v-list-item-title>查看照片实际大小</v-list-item-title>
          </v-list-item>
          <v-list-item @click="openPhotoInFolder">
            <v-list-item-title>打开照片所在位置</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="() => {}">
            <v-list-item-title>删除此照片</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app right permanent width="320" v-if="drawer">
      <v-app-bar absolute color="indigo darken-2" dark dense>
        <div>{{drawerTitle}}</div>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>

      <div class="drawer-content" v-if="drawerType === 'info'">
        <photo-info :photo="photo"/>
      </div>
      <div class="drawer-content" v-else-if="drawerType === 'face'">
        <photo-faces :photo="photo"/>
      </div>
      <div class="drawer-content" v-else-if="drawerType === 'search'">
        <photo-search :photo="photo"/>
      </div>
      <div class="drawer-content" v-else-if="drawerType === 'tags'">
        即将推出
      </div>
    </v-navigation-drawer>

    <v-main class="photo-main ma-4">

      <div class="photo-container" v-if="photo" @mousewheel="handleZoom">
        <figure>
          <img class="photo-image" :src="`file://${photo.path}`"/>
        </figure>
      </div>
      <div class="photo-container" v-else>No photo.</div>

    </v-main>
  </v-app>
</template>

<script>
import { ipcRenderer, shell } from 'electron'
import PhotoInfo from '../components/PhotoInfo'
import PhotoFaces from '../components/PhotoFaces'
import PhotoSearch from '../components/PhotoSearch'

export default {
  name: 'Photo',
  components: {
    PhotoInfo,
    PhotoFaces,
    PhotoSearch
  },
  data: () => ({
    drawer: false,
    drawerType: '',
    photo: null,
    zoomValue: 1
  }),
  computed: {
    drawerTitle () {
      const drawerMapping = [
        { key: 'info', value: '照片信息' },
        { key: 'face', value: '人脸识别' },
        { key: 'search', value: '以图搜图' },
        { key: 'tags', value: '智能标签' }
      ]
      return drawerMapping.find(item => item.key === this.drawerType).value
    }
  },
  created () {
    ipcRenderer.invoke('load-photo', this.$route.params.id).then(photo => {
      this.photo = photo
    })
  },
  methods: {
    openPhotoInFolder () {
      shell.showItemInFolder(this.photo.path)
    },
    handleZoom (event) {
      this.zoomValue += event.wheelDelta / 1200
      // 设置放大的最大倍数和最小倍数
      if (this.zoomValue >= 10) {
        this.zoomValue = 10
      } else if (this.zoomValue < 0.2) {
        this.zoomValue = 0.2
      }
      document.querySelector('.photo-container figure').style.transform = `scale(${this.zoomValue})`
    }
  }
}
</script>

<style scoped>
.photo-main {
  position: relative;
}
.photo-container {
  display: flex;
  height: calc(100vh - 80px);
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.photo-container figure {
  display: inline-block;
  position: relative;
  max-width: 100%;
  max-height: calc(100vh - 80px);
}

.photo-container figure img.photo-image {
  display: block;
  max-width: 100%;
  max-height: inherit;
}
.photo-container figure .face-rectangle {
  position: absolute;
  border: 2px solid;
  z-index: 99;
}
.drawer-content {
  margin-top: 48px;
}
</style>
