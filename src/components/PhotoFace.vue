<template>
  <div v-if="loading">
    <div class="loading pa-12">
      <p>人脸识别中</p>
      <v-progress-linear indeterminate rounded height="6"></v-progress-linear>
    </div>
  </div>
  <div v-else>
    <p>人脸识别<br/>{{$props.photo.file}}</p>
    <p>人脸识别<br/>{{face}}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PhotoFace',
  props: ['photo'],
  data: () => ({
    loading: true,
    face: null
  }),
  created () {
    axios.get('https://br.xinhua-news.cn/cav20/api/2020/candidates').then(response => {
      console.log(response)
      this.loading = false
      this.face = response.data.data[0].content
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.loading {
  height: 288px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
