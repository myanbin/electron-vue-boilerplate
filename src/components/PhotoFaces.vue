<template>
  <div v-if="loading">
    <div class="loading">
      <p>正在人脸识别 ..</p>
      <v-progress-linear indeterminate rounded height="6"></v-progress-linear>
    </div>
  </div>
  <div v-else>
    <v-list two-line>
      <v-list-item v-for="face in faces" :key="face.name" @click="showFaceBorder(face)">
        <v-list-item-content :title="`${face.name} - ${face.info}`">
          <v-list-item-title>{{face.name}}</v-list-item-title>
          <v-list-item-subtitle>{{face.info}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: 'PhotoFaces',
  props: ['photo'],
  data: () => ({
    loading: true,
    faces: []
  }),
  created () {
    ipcRenderer.invoke('load-photo-faces', this.$props.photo._id).then(faces => {
      this.faces = faces
      console.log(faces)
      this.loading = false
    })
  },
  methods: {
    showFaceBorder (face) {
      const [x1, y1, x2, y2] = face.position
      const f = this.$props.photo.dimensions.width / document.querySelector('.photo-canvas img.photo').clientWidth
      console.log(f, x1, y1, x2, y2)
    }
  }
}
</script>

<style scoped>
.loading {
  height: 288px;
  display: flex;
  padding: 64px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
