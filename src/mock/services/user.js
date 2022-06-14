import Mock from 'mockjs2'
import { builder } from '../util'

const info = options => {
  console.log('options', options)
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '天野远子',
    username: 'admin',
    password: '',
    avatar: '/avatar2.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0
    // permissions: [
    //   {
    //     permissionId: 'dashboard',
    //     permissionName: '仪表盘',
    //     actions: [
    //       {
    //         action: 'add',
    //         describe: '新增',
    //         defaultCheck: false
    //       },
    //       {
    //         action: 'query',
    //         describe: '查询',
    //         defaultCheck: false
    //       },
    //       {
    //         action: 'get',
    //         describe: '详情',
    //         defaultCheck: false
    //       },
    //       {
    //         action: 'update',
    //         describe: '修改',
    //         defaultCheck: false
    //       },
    //       {
    //         action: 'delete',
    //         describe: '删除',
    //         defaultCheck: false
    //       }
    //     ]
    //   }
    // ]
  }

  return builder(userInfo)
}

/**
 * 使用 用户登录的 token 获取用户有权限的菜单
 * 返回结构必须按照这个结构体形式处理，或根据
 * /src/router/generator-routers.js  文件的菜单结构处理函数对应即可
 */
const userNav = () => {
  const nav = [
    // dashboard
    {
      name: 'dashboard',
      parentId: 0,
      id: 1,
      meta: {
        icon: 'dashboard',
        title: '仪表盘',
        show: true
      },
      component: 'BlankLayout',
      redirect: '/dashboard/workplace'
    },
    {
      name: 'workplace',
      parentId: 1,
      id: 7,
      meta: {
        title: '工作台',
        show: true
      },
      component: 'Workplace'
    },
    // 其他
    {
      name: 'other',
      parentId: 0,
      id: 22,
      meta: {
        icon: 'copy',
        title: '其他',
        show: true
      },
      component: 'BlankLayout',
      redirect: '/other/iconSelector'
    },
    {
      name: 'IconSelector',
      parentId: 22,
      id: 221,
      meta: {
        title: 'IconSelector',
        show: true
      },
      component: 'IconSelector'
    }
  ]
  const json = builder(nav)
  return json
}

Mock.mock(new RegExp('/user/info'), 'get', info)
Mock.mock(new RegExp('/user/nav'), 'get', userNav)
