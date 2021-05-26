<template>
  <div v-if="loading">
    <div class="loading">
      <p>正在人脸识别 ..</p>
      <v-progress-linear indeterminate rounded height="6"></v-progress-linear>
    </div>
  </div>
  <div v-else>
    <v-list two-line>
      <v-list-item v-for="face in faces" :key="face.name" @click="showFaceRectangle(face)">
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
    showFaceRectangle (face) {
      const [x1, y1, x2, y2] = face.position
      // 使用相对数值计算人脸位置，适配图像缩放问题
      const el = document.createElement('div')
      el.style.left = `${x1 / this.$props.photo.dimensions.width * 100}%`
      el.style.top = `${y1 / this.$props.photo.dimensions.height * 100}%`
      el.style.width = `${(x2 - x1) / this.$props.photo.dimensions.width * 100}%`
      el.style.height = `${(y2 - y1) / this.$props.photo.dimensions.height * 100}%`
      el.style.position = 'absolute'
      el.style.border = '2px solid #303f9f'
      el.style.zIndex = 99
      el.title = face.name
      document.querySelector('.photo-container figure').append(el)
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
