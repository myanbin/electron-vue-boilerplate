<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <v-btn icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>照片库</v-toolbar-title>
      <v-spacer></v-spacer>

      <search-field v-model="keyword" @change="search"/>
      <v-btn icon @click="$router.push('/settings')">
        <v-icon>mdi-cog</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main class="ma-4">
      <div v-if="photos.length">
        <router-link :to="`/photo/${photo._id}`" class="photo-grid ma-1" v-for="photo in photos" :key="photo.uuid">
          <img :src="`file://${photo.path}`"/>
        </router-link>
      </div>
      <div v-else>No photos.</div>
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
    photos: [],
    keyword: ''
  }),
  created () {
    ipcRenderer.invoke('load-photos').then(photos => {
      this.photos = photos
    })
  },
  methods: {
    search (value) {
      console.log('search library', value)
      ipcRenderer.invoke('load-photos', value).then(photos => {
        this.photos = photos
      })
    }
  }
}
</script>

<style scoped>
.photo-grid {
  display: inline-block;
  height: 200px;
  overflow: hidden;
}
.photo-grid img {
  height: 200px;
  transform: scale(1);
  transition: all 1s;
}
.photo-grid img:hover {
  transform: scale(1.10);
  transition: all 1s;
}
</style>
