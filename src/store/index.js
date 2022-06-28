import Vue from 'vue'
import Vuex from 'vuex'

const modulesFiles = require.context('./', true, /\.js$/)
const modules = {}
for (const modulePath of modulesFiles.keys())
  if (!modulePath.includes('index.js')) modules[modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')] = modulesFiles(modulePath).default

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules
})
