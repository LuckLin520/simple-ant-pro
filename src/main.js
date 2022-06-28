import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bootstrap from './config/bootstrap'
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import './config/lazy_use' // use lazy load components
import './config/themePluginConfig'
import './permission' // permission control

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
