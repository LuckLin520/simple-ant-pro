import storage from 'store'
import $axios from '@/utils/axios'
import { generatorDynamicRouter } from '@/router/generator-routers'

export default {
  namespaced: true,
  state: {
    token: storage.get('token') || '',
    userData: {},
    routes: []
  },

  mutations: {
    save(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    }
  },

  actions: {
    // 登录
    async login(store, payload) {
      const data = await $axios({ url: '/auth/login', method: 'post', data: payload })
      if (data.code === 200) {
        store.commit('save', { token: data.result.token })
        storage.set('token', data.result.token, 7 * 24 * 60 * 60 * 1000)
      }
      return data
    },
    // 登出
    async logout(store) {
      const data = await $axios({ url: '/auth/logout', method: 'post' })
      if (data.code === 200) {
        store.commit('save', { token: '', roles: [] })
        storage.remove('token')
      }
      return data
    },
    // 获取用户信息
    async getInfo(store) {
      const data = await $axios({ url: '/user/info' })
      if (data.code === 200) {
        store.commit('save', { userData: data.result })
        return data.result
      }
    },
    // 获取路由
    async getRoutes(store) {
      const data = await $axios({ url: '/user/nav' })
      if (data.code === 200) {
        const routes = generatorDynamicRouter(data.result)
        store.commit('save', { routes })
        return routes
      }
    }
  }
}
