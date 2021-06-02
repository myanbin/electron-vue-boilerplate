<template>
  <div>
    <v-list two-line>
      <!-- <v-subheader>基本信息</v-subheader> -->
      <v-list-item @click="() => {}">
        <v-list-item-content>
          <v-list-item-subtitle>名称</v-list-item-subtitle>
          <v-list-item-title>{{$props.photo.filename}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="() => {}">
        <v-list-item-content>
          <v-list-item-subtitle>位置</v-list-item-subtitle>
          <v-list-item-title>{{$props.photo.path}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="() => {}">
        <v-list-item-content>
          <v-list-item-subtitle>尺寸</v-list-item-subtitle>
          <v-list-item-title>{{$props.photo.dimensions.width}} x {{$props.photo.dimensions.height}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list two-line v-if="exif">
      <v-list-item @click="() => {}">
        <v-list-item-content>
          <v-list-item-subtitle>拍摄器材</v-list-item-subtitle>
          <v-list-item-title>{{exif.Make}} {{exif.Model}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="() => {}">
        <v-list-item-content>
          <v-list-item-subtitle>镜头型号</v-list-item-subtitle>
          <v-list-item-title>{{exif.LensModel}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="() => {}">
        <v-list-item-content>
          <v-list-item-subtitle>光圈</v-list-item-subtitle>
          <v-list-item-title>{{exif.FNumber}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="() => {}">
        <v-list-item-content>
          <v-list-item-subtitle>快门</v-list-item-subtitle>
          <v-list-item-title>{{exif.ExposureTime}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="() => {}">
        <v-list-item-content>
          <v-list-item-subtitle>焦距</v-list-item-subtitle>
          <v-list-item-title>{{exif.FocalLength}}mm</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="() => {}">
        <v-list-item-content>
          <v-list-item-subtitle>ISO 感光度</v-list-item-subtitle>
          <v-list-item-title>{{exif.ISO}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import * as dayjs from 'dayjs'

export default {
  name: 'PhotoInfo',
  props: ['photo'],
  data: () => ({
    dayjs,
    exif: undefined
  }),
  created () {
    console.log('load exif')
    ipcRenderer.invoke('load-photo-exif', this.$props.photo._id).then(exif => {
      this.exif = exif
    })
  }
}
</script>
