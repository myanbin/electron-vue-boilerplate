<template>
  <div>
    <p>文件名<br/>{{$props.photo.filename}}</p>
    <p>拍摄时间<br/>{{dayjs($props.photo.ctime).format('YYYY-MM-DD HH:mm:ss')}}</p>
    <p>照片尺寸<br/>{{$props.photo.dimensions.width}} x {{$props.photo.dimensions.height}}</p>
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
