<template>
  <v-app>
    <v-app-bar app color="indigo darken-2" dark dense clipped-left>
      <v-btn icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>照片库</v-toolbar-title>
      <v-spacer></v-spacer>

      <search-field v-model="keyword" @change="search"/>
      <v-btn icon @click="$router.push('/settings')" title="打开设置">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app mini-variant permanent class="app-nav">
      <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-image</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>照片</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>人物</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-map-marker</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>位置</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>收藏</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="ma-4">
      <v-alert dense outlined icon="mdi-broadcast" class="text-body-2" v-if="broadcast.length">欢迎使用照片库应用</v-alert>
      <div class="library-options" v-if="photos.length">
        <div class="order-field">
          <v-select solo dense flat hide-details :items="viewOptions" item-text="text" item-value="value" v-model="selected" class="text-body-2" @change="reorder"></v-select>
        </div>
        <v-spacer></v-spacer>
        <v-btn-toggle mandatory dense flat borderless v-model="viewLayout">
          <v-btn icon value="flow">
            <v-icon>mdi-view-compact</v-icon>
          </v-btn>
          <v-btn icon value="grid">
            <v-icon>mdi-view-module</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
      <div v-if="photos.length === 0">No photos.</div>
      <div class="flow-view" v-else-if="viewLayout === 'flow'">
        <router-link :to="`/photo/${photo._id}`" class="photo-item ma-1" v-for="photo in photos" :key="photo.uuid">
          <img :src="`file://${photo.path}`"/>
        </router-link>
      </div>
      <div class="grid-view" v-else-if="viewLayout === 'grid'">
        <router-link :to="`/photo/${photo._id}`" class="photo-item ma-1" v-for="photo in photos" :key="photo.uuid">
          <img :src="`file://${photo.path}`"/>
          <div class="faces" v-if="photo.faces && photo.faces.length > 0">{{photo.faces.map(f => f.name).join(' ')}}</div>
        </router-link>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { ipcRenderer } from 'electron'
import SearchField from '../components/SearchField'

export default {
  name: 'Library',
  components: {
    SearchField
  },
  data: () => ({
    broadcast: '',
    photos: [],
    keyword: '',
    viewOptions: [
      { text: '最近添加', value: 'latest' },
      { text: '拍摄时间', value: 'created' }
    ],
    selected: { text: '最近添加', value: 'latest' },
    viewLayout: 'grid'
  }),
  created () {
    ipcRenderer.invoke('load-photos').then(photos => {
      this.photos = photos
    })
  },
  methods: {
    search (value) {
      ipcRenderer.invoke('load-photos', value).then(photos => {
        this.photos = photos
      })
    },
    reorder (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>
.app-nav {
  margin-top: 48px;
}
.library-options {
  display: flex;
  margin-bottom: 8px;
}
.library-options .order-field {
  width: 120px;
}
.photo-item {
  display: inline-block;
  height: 200px;
  overflow: hidden;
  position: relative;
}
.photo-item img {
  height: 200px;
  transform: scale(1);
  transition: ease 0.5s;
}
.photo-item img:hover {
  transform: scale(1.10);
  transition: ease 0.5s;
}
.photo-item .faces {
  position: absolute;
  height: 20px;
  bottom: 0;
  line-height: 20px;
  width: 100%;
  font-size: 12px;
  padding: 0 4px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
}
/* 流式布局 */
.flow-view {
  display: block;
  line-height: 0;
}
/* 网格布局 */
.grid-view {
  display: block;
  line-height: 0;
}
.grid-view .photo-item {
  width: 200px;
}
.grid-view .photo-item img {
  width: 200px;
  object-fit: cover;
}
</style>
