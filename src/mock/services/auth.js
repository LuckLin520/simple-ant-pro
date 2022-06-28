import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const login = options => {
  const { username, password } = getBody(options)
  console.log('mock: body', { username, password })
  if (username !== 'admin' || password !== 'admin') {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  return builder({
    id: Mock.mock('@guid'),
    name: Mock.mock('@name'),
    username: 'admin',
    password: '',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    status: 1,
    phone: '15348298177',
    lastLoginTime: 1534837621348,
    createTime: 1497160610259,
    token: '4291d7da9005377ec9aec4a71ea837f'
  })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功', 200)
}

Mock.mock(new RegExp('/auth/login'), 'post', login)
Mock.mock(new RegExp('/auth/logout'), 'post', logout)
