<template>
  <v-app>
    <v-app-bar app color="indigo darken-2" dark dense clipped-left>
      <v-btn icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title>{{$route.meta.title}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- <search-field v-model="keyword" @change="search"/> -->
      <v-btn icon @click="$router.push('/settings')" title="打开设置">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <!-- <v-btn icon @click="$router.push('/login')">
        <v-icon>mdi-account</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-navigation-drawer app mini-variant permanent class="app-nav">
      <v-list dense nav>
        <v-list-item link to="/" title="照片库">
          <v-list-item-icon>
            <v-icon>mdi-image</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>照片</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/people" title="人物">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>人物</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/location" title="位置">
          <v-list-item-icon>
            <v-icon>mdi-map-marker</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>位置</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/favorites" title="收藏">
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
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { ipcRenderer } from 'electron'
// import SearchField from '../components/SearchField'

export default {
  name: 'Library',
  components: {
    // SearchField
  },
  data: () => ({
    keyword: ''
  }),
  created () {
  },
  methods: {
    search (value) {
      const re = new RegExp(value)
      const query = value ? { 'faces.name': re } : {}
      ipcRenderer.invoke('load-photos', query).then(photos => {
        this.photos = photos
      })
    }
  }
}
</script>

<style scoped>
.app-nav {
  margin-top: 48px;
}
</style>
