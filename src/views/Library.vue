<template>
  <v-app>
    <v-app-bar app color="indigo darken-2" dark dense>
      <v-btn icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>照片库</v-toolbar-title>
      <v-spacer></v-spacer>

      <search-field v-model="keyword" @change="handleSearch"/>
      <v-btn icon @click="$router.push('/settings')">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="ma-4">
      <v-alert dense outlined icon="mdi-broadcast" class="text-body-2">欢迎使用照片库应用</v-alert>
      <div class="library-options">
        <v-select solo dense flat hide-details prepend-icon="mdi-image-multiple" :items="viewOptions" item-text="text" item-value="value" v-model="selected" @change="handleFilter"></v-select>
      </div>
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
    keyword: '',
    viewOptions: [
      { text: '最近添加', value: 'latest' },
      { text: '拍摄时间', value: 'created' }
    ],
    selected: { text: '最近添加', value: 'latest' }
  }),
  created () {
    ipcRenderer.invoke('load-photos').then(photos => {
      this.photos = photos
    })
  },
  methods: {
    handleSearch (value) {
      ipcRenderer.invoke('load-photos', value).then(photos => {
        this.photos = photos
      })
    },
    handleFilter (value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>
.library-options {
  display: flex;
  width: 160px;
  margin-bottom: 16px;
}
.photo-grid {
  display: inline-block;
  height: 200px;
  overflow: hidden;
}
.photo-grid img {
  height: 200px;
  transform: scale(1);
  transition: ease 0.5s;
}
.photo-grid img:hover {
  transform: scale(1.10);
  transition: ease 0.5s;
}
</style>
