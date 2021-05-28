module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config
      .plugin("html")
      .tap(args => {
        args[0].title = '智能照片库'
        return args
      })
  },
  // https://stackoverflow.com/questions/56478000/loading-preload-script-in-electron-and-vue
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      nodeIntegration: true
    }
  }
}
