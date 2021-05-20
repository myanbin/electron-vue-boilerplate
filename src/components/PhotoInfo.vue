<template>
  <div>
    <p>文件名<br/>{{$props.photo.file}}</p>
    <p>拍摄时间<br/>{{dayjs($props.photo.ctime).format('YYYY-MM-DD HH:mm:ss')}}</p>
  </div>
</template>

<script>
import * as dayjs from 'dayjs'

export default {
  name: 'PhotoInfo',
  props: ['photo'],
  data: () => ({
    dayjs
  }),
  created () {
    console.log(this.$props.photo)
  }
}
</script>
