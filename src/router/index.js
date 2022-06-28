import Vue from 'vue'
import Router from 'vue-router'
import { UserLayout } from '@/layouts'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user',
      component: UserLayout,
      redirect: '/user/login',
      hidden: true,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
        }
      ]
    },
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "fail" */ '@/components/404')
    }
  ]
})
