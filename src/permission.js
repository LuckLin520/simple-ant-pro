import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['login'] // no redirect allowList
const loginRoutePath = '/user/login'
const defaultRoutePath = '/'

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (storage.get('token')) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (!store.state.user.routes.length) {
        const routes = await store.dispatch('user/getRoutes')
        routes.forEach(r => router.addRoute(r))
        // 请求带有 redirect 重定向时，登录自动重定向到该地址
        const redirect = decodeURIComponent(from.query.redirect || to.path)
        if (to.path === redirect) next({ ...to, replace: true })
        else next({ path: redirect })
      } else {
        next()
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
