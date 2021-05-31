<template>
  <div>
    <div class="grid-view">
      <router-link :to="`/view/${photo._id}`" class="photo-item ma-1" v-for="photo in photos" :key="photo.uuid">
        <img :src="`file://${photo.path}`"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'Favorites',
  data: () => ({
    photos: []
  }),
  created () {
    const query = {
      favorited: true
    }
    ipcRenderer.invoke('load-photos', query).then(photos => {
      this.photos = photos
    })
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
