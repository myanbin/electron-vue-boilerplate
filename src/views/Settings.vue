<template>
  <v-app>
    <v-app-bar app color="indigo darken-2" dark dense>
      <v-btn icon @click="$router.push('/')" title="返回照片库">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>设置</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main class="ma-4">
      <h5 class="text-h5 mb-4">照片源</h5>
      <p>添加文件夹以包含更多照片。</p>

      <p>
        <v-btn @click="addFolder">添加文件夹</v-btn>
      </p>

      <v-list dense outlined class="mb-4">
        <v-list-item v-for="path in settings.sources" :key="path" @click.stop="openFolder(path)">
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="path">{{path}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon color="red lighten-2" @click.stop="deleteFolder(path)">mdi-delete</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item v-if="!settings.sources.length">
          <v-list-item-title class="path">暂无文件夹</v-list-item-title>
        </v-list-item>
      </v-list>

      <h5 class="text-h5 mb-4">外观</h5>
      <p>选择应用主题</p>

      <v-radio-group row v-model="settings.theme" @change="changeTheme">
        <v-radio label="亮色模式" value="light"></v-radio>
        <v-radio label="暗黑模式" value="dark"></v-radio>
        <v-radio label="系统设置" value="system"></v-radio>
      </v-radio-group>

      <h5 class="text-h5 mb-4">人脸识别</h5>
      <p v-if="nofacesCount">库中还有 {{nofacesCount}} 张照片未进行人脸识别。</p>
      <p v-else>库中所有照片均已进行人脸识别。</p>
      <p v-if="nofacesCount">
        <v-btn @click="patchfacesRecognition">立刻识别</v-btn>
      </p>

      <h5 class="text-h5 mb-4">发送反馈</h5>
      <p>在使用本应用中，您有什么感受或者想法，都可以给作者发送反馈。您可以发送邮件到 mayanbin@xinhua.org 或通过蓝信联系 <u>马艳彬</u>。<br/>您的反馈对我们非常重要。</p>

      <h5 class="text-h5 mb-4">关于照片库</h5>
      <p>版本 {{appVersion}}<br/>构建日期 2021-06-03 14:35:23<br/>新华社技术局 版权所有</p>

    </v-main>
  </v-app>
</template>

<script>
import { ipcRenderer, shell } from 'electron'
import { version } from '../../package.json'

export default {
  name: 'Settings',
  data: () => ({
    settings: { sources: [], theme: 'light', count: 0 },
    nofacesCount: 0,
    appVersion: version
  }),
  created () {
    ipcRenderer.invoke('load-settings').then(data => {
      [this.settings, this.nofacesCount] = data
    })
  },
  methods: {
    addFolder () {
      ipcRenderer.invoke('open-directory').then(data => {
        this.settings = data[0]
        this.nofacesCount += data[1]

        const notification = new Notification(`库中新增 ${data[1]} 张照片`)
        notification.onclick = () => {
          console.log('aaa')
        }
      })
    },
    openFolder (path) {
      shell.openPath(path)
    },
    deleteFolder (path) {
      ipcRenderer.invoke('remove-directory', path).then(data => {
        this.settings = data[0]
        this.nofacesCount -= data[1]
      })
    },
    changeTheme () {
      if (this.settings.theme === 'light') {
        this.$vuetify.theme.dark = false
      } else if (this.settings.theme === 'dark') {
        this.$vuetify.theme.dark = true
      }
    },
    patchfacesRecognition () {
      ipcRenderer.invoke('patchadd-photo-faces').then(photos => {
        console.log('update photos', photos.length)
        this.nofacesCount = 0
      })
    }
  }
}
</script>

<style scoped>
div.v-list-item__title.path {
  font-size: 14px;
  font-weight: 400;
}
</style>
