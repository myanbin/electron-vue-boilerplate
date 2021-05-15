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

      <p>
        <v-btn color="primary">添加文件夹</v-btn>
      </p>

      <v-list dense>
        <v-list-item @click.stop="openFolder('/user/ybm/pictures/')">
          <v-list-item-avatar size="32" color="grey">
            <v-icon small dark>mdi-folder</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>/user/ybm/pictures/</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn icon @click.stop="deleteFolder('/user/ybm/pictures/')">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>

        <v-list-item @click.stop="openFolder('/user/ybm/pictures/')">
          <v-list-item-avatar size="32" color="grey">
            <v-icon small dark>mdi-folder</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>/user/myanbin/onedriver/</v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-btn icon @click.stop="deleteFolder('/user/myanbin/onedriver/')">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>

      <h5 class="text-h5 mb-4">外观</h5>
      <p>选择应用主题</p>

      <v-radio-group row>
        <v-radio label="亮色模式" value="light"></v-radio>
        <v-radio label="暗黑模式" value="dark"></v-radio>
        <v-radio label="系统设置" value="system"></v-radio>
      </v-radio-group>

      <h5 class="text-h5 mb-4">查看和编辑</h5>
      <p>选择应用主题</p>

    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Settings',
  methods: {
    openFolder (path) {
      console.log('open', path)
    },
    deleteFolder (path) {
      console.log('delete', path)
    }
  }
}
</script>

<style scoped>

</style>
