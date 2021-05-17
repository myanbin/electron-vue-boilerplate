<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <v-btn icon @click="$router.push('/')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>设置</v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main class="ma-4">
      <h5 class="text-h5 mb-4">照片源</h5>
      <p>您的照片库中共有 340 张照片，添加文件夹以包含更多照片。</p>

      <v-btn color="primary" @click="addFolder">添加文件夹</v-btn>

      <v-list dense class="mb-4">
        <v-divider/>
        <v-list-item v-for="path in settings.paths" :key="path" @click.stop="openFolder(path)">
          <v-list-item-avatar size="28" color="grey">
            <v-icon small dark>mdi-folder</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="path">{{path}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn icon small color="red" @click.stop="deleteFolder(path)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item v-if="!settings.paths.length">
          <v-list-item-title class="path">暂无文件夹</v-list-item-title>
        </v-list-item>
        <v-divider/>
      </v-list>

      <h5 class="text-h5 mb-4">外观</h5>
      <p>选择应用主题</p>

      <v-radio-group row v-model="settings.theme">
        <v-radio label="亮色模式" value="light"></v-radio>
        <v-radio label="暗黑模式" value="dark" color="black"></v-radio>
        <v-radio label="系统设置" value="system"></v-radio>
      </v-radio-group>

      <h5 class="text-h5 mb-4">发送反馈</h5>
      <p>在使用本应用中，您有什么感受或者想法，都可以给作者发送反馈。您可以发送邮件到 mayanbin@xinhua.org 或通过蓝信联系 <u>马艳彬</u>。</p>
      <p>您的反馈对我们非常重要。</p>

    </v-main>
  </v-app>
</template>

<script>
import { ipcRenderer, shell } from 'electron'

export default {
  name: 'Settings',
  data: () => ({
    settings: null
  }),
  created () {
    this.settings = {
      paths: [],
      theme: 'light'
    }
  },
  methods: {
    addFolder () {
      ipcRenderer.invoke('open-directory-dialog').then(path => {
        if (path && !this.settings.paths.includes(path)) {
          this.settings.paths.push(path)
        }
      })
    },
    openFolder (path) {
      shell.openPath(path)
    },
    deleteFolder (path) {
      //
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
