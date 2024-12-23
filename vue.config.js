const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: 'warning'
// })

module.exports = {
  devServer: {
      open: true,
      port: 8812,
  },
  lintOnSave: false
}