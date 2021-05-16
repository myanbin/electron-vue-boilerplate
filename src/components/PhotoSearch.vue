<template>
  <div v-if="loading">
    <div class="loading">
      <p>正在以图搜图 ..</p>
      <v-progress-linear indeterminate rounded height="6"></v-progress-linear>
    </div>
  </div>
  <div v-else>
    <p>以图搜图<br/>{{result}}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PhotoSearch',
  props: ['photo'],
  data: () => ({
    loading: true,
    result: null
  }),
  created () {
    axios.get('https://br.xinhua-news.cn/cav20/api/2020/candidates').then(response => {
      console.log(response)
      this.loading = false
      this.result = response.data.data[2].content
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
  padding: 64px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
