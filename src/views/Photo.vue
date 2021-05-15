<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <v-btn icon @click="$router.push('/')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>照片</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click.stop="drawer = true; drawerType = 'info'">
        <v-icon>mdi-information</v-icon>
      </v-btn>
      <v-btn icon @click.stop="drawer = true; drawerType = 'face'">
        <v-icon>mdi-account-box</v-icon>
      </v-btn>
      <v-btn icon @click.stop="drawer = true; drawerType = 'search'">
        <v-icon>mdi-image-search</v-icon>
      </v-btn>
      <v-btn icon @click.stop="drawer = true; drawerType = 'tags'">
        <v-icon>mdi-tag-multiple</v-icon>
      </v-btn>
      <v-btn icon color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app right permanent width="320" v-if="drawer">
      <v-app-bar color="primary" dark dense>
        <v-toolbar-title>{{drawerType}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>

      <div class="ma-4" v-if="drawerType === 'info'">
        <photo-info/>
      </div>
      <div class="ma-4" v-else-if="drawerType === 'face'">
        <photo-face/>
      </div>
      <div class="ma-4" v-else-if="drawerType === 'search'">
        Search
      </div>
    </v-navigation-drawer>

    <v-main class="ma-4">
      <div class="photo-canvas">
        <v-img contain width="100%" height="100%" src="file:///Users/ybm/Pictures/趣图/20210511011014_450694.jpeg"></v-img>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PhotoInfo from '../components/PhotoInfo'
import PhotoFace from '../components/PhotoFace'

export default {
  name: 'Photo',
  components: {
    PhotoInfo,
    PhotoFace
  },
  data: () => ({
    drawer: false,
    drawerType: ''
  })
}
</script>

<style scoped>
.photo-canvas {
  display: flex;
  height: calc(100vh - 80px);
  justify-content: center;
  align-items: center;
}
</style>
