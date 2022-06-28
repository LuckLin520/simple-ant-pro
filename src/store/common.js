import storage from 'store'
import { updateTheme } from '@ant-design-vue/pro-layout'
// import defaultSettings from '@/config/defaultSettings'
// const settings = storage.get('settings') || defaultSettings
const settings = storage.get('settings')
updateTheme(settings.primaryColor)
export default {
  namespaced: true,
  state: {
    settings
  },
  mutations: {
    save(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    }
  },
  actions: {
    saveSettings(store, payload) {
      store.commit('save', payload)
      storage.set('settings', payload)
    }
  }
}
