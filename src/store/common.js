import storage from 'store'
import { updateTheme } from '@ant-design-vue/pro-layout'
import defaultSetting from '@/config/defaultSetting'
export default {
  namespaced: true,
  state: {
    settings: {}
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
      store.commit('save', { settings: payload })
      storage.set('settings', payload)
    },
    resetSetting(store) {
      store.dispatch('saveSettings', defaultSetting)
      updateTheme(defaultSetting.primaryColor)
    }
  }
}
