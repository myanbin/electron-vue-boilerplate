module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  // https://stackoverflow.com/questions/56478000/loading-preload-script-in-electron-and-vue
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      nodeIntegration: true
    }
  }
}
