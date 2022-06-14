const path = require('path')

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: []
  },

  chainWebpack: config => {
    config.resolve.alias.set('@$', path.join(__dirname, 'src'))
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          'primary-color': 'orange',
          'link-color': 'orange',
          'font-size-base': '14px',
          'text-color-secondary': 'fade(#000, 45%)',
          'border-radius-base': '2px'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8000
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    // proxy: {
    //   '/api': {
    //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

module.exports = vueConfig
