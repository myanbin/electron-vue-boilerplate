<template>
  <div class="people">
    <p>照片库中检测到 {{ peoples.length }} 个人物</p>
    <v-slide-group mandatory show-arrows>
      <v-slide-item v-for="(face, index) in peoples" :key="index">
        <v-card class="ma-2" width="96" height="96" @click="select(index)">
          <v-img class="align-end" :src="face.avatar">
            <v-card-title class="px-2 py-1 white--text text-body-2">{{face.name}}</v-card-title>
          </v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <p class="mt-4" v-if="current">包含 {{current.name}} 的照片共有 {{current.photos.length}} 张</p>

    <div class="grid-view" v-if="current">
      <router-link :to="`/view/${photo._id}`" class="photo-item ma-1" v-for="photo in current.photos" :key="photo.uuid">
        <img :src="`file://${photo.path}`"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'People',
  data: () => ({
    peoples: [],
    current: null
  }),
  created () {
    ipcRenderer.invoke('load-peoples').then(peoples => {
      console.log(peoples)
      this.peoples = peoples
    })
  },
  methods: {
    select (index) {
      this.current = this.peoples[index]
    }
  }
}
</script>

<style scoped>
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
