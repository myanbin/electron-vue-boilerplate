<template>
  <div>
    <p>人脸识别<br/>{{$props.photo.file}}</p>
  </div>
</template>

<script>
export default {
  name: 'PhotoFace',
  props: ['photo'],
  created () {
    console.log(this.$props.photo)
  }
}
</script>
