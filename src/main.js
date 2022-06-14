import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import './config/lazy_use' // use lazy load components
import './permission' // permission control
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
