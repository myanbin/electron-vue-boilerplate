<template>
  <v-app>
    <v-app-bar app color="indigo" dark dense>
      <v-btn icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-toolbar-title>照片库</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="$router.push('/settings')">
        <v-icon>mdi-cog</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main class="ma-4">
      <router-link to="/photo" class="photo-grid ma-1">
        <img src="file:///Users/ybm/Pictures/照片图库.photoslibrary/resources/derivatives/masters/1/1C58B60D-0177-40C8-97FE-69693A2FB3E4_4_5005_c.jpeg"/>
      </router-link>
      <router-link to="/photo" class="photo-grid ma-1">
        <img src="file:///Users/ybm/Pictures/照片图库.photoslibrary/resources/derivatives/masters/1/1E984677-57C9-42A3-B2E6-D3EF68AD3EBF_4_5005_c.jpeg"/>
      </router-link>
      <router-link to="/photo" class="photo-grid ma-1">
        <img src="file:///Users/ybm/Pictures/照片图库.photoslibrary/resources/derivatives/masters/1/114A9B94-4B0E-4FEC-A69C-5F52F2645375_4_5005_c.jpeg"/>
      </router-link>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Library'
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
