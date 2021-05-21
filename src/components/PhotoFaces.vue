<template>
  <div v-if="loading">
    <div class="loading">
      <p>正在人脸识别 ..</p>
      <v-progress-linear indeterminate rounded height="6"></v-progress-linear>
    </div>
  </div>
  <div v-else>
    <p v-for="face in faces" :key="face.pid">
      {{face.name}}<br/>{{face.info}}
    </p>
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
