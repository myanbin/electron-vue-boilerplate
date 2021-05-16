<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <v-btn icon @click="$router.push('/')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>照片 {{$route.params.uuid.split('-')[4]}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon :disabled="!photo" @click.stop="drawer = true; drawerType = 'info'">
        <v-icon>mdi-information</v-icon>
      </v-btn>
      <v-btn icon :disabled="!photo" @click.stop="drawer = true; drawerType = 'face'">
        <v-icon>mdi-account-box</v-icon>
      </v-btn>
      <v-btn icon :disabled="!photo" @click.stop="drawer = true; drawerType = 'search'">
        <v-icon>mdi-image-search</v-icon>
      </v-btn>
      <v-btn icon :disabled="!photo" @click.stop="drawer = true; drawerType = 'tags'">
        <v-icon>mdi-tag-multiple</v-icon>
      </v-btn>
      <v-btn icon color="red" :disabled="!photo">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app right permanent width="320" color="grey lighten-4" v-if="drawer">
      <v-app-bar absolute color="primary" dark dense>
        <v-toolbar-title>{{drawerType}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>

      <div class="drawer-content" v-if="drawerType === 'info'">
        <photo-info :photo="photo"/>
      </div>
      <div class="drawer-content" v-else-if="drawerType === 'face'">
        <photo-face :photo="photo"/>
      </div>
      <div class="drawer-content" v-else-if="drawerType === 'search'">
        <photo-search :photo="photo"/>
      </div>
    </v-navigation-drawer>

    <v-main class=" photo-main ma-4">

      <div class="photo-canvas" v-if="photo">
        <v-img contain width="100%" height="100%" :src="`file://${photo.path}`"></v-img>
      </div>
      <div class="photo-canvas" v-else>No photo.</div>

    </v-main>
  </v-app>
</template>

<script>
import PhotoInfo from '../components/PhotoInfo'
import PhotoFace from '../components/PhotoFace'
import PhotoSearch from '../components/PhotoSearch'

export default {
  name: 'Photo',
  components: {
    PhotoInfo,
    PhotoFace,
    PhotoSearch
  },
  data: () => ({
    drawer: false,
    drawerType: '',
    photo: null
  }),
  created () {
    const photos = JSON.parse(localStorage.getItem('library'))
    const index = photos.findIndex(item => item.uuid === this.$route.params.uuid)
    this.photo = photos[index]
  }
}
</script>

<style scoped>
.photo-main {
  position: relative;
}
.photo-canvas {
  display: flex;
  height: calc(100vh - 80px);
  justify-content: center;
  align-items: center;
}
.drawer-content {
  margin: 64px 16px 16px 16px;
}
</style>
