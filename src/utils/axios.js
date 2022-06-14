import axios from 'axios'
import store from '@/store'
import storage from 'store'

const $axios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000
})
console.log(store)

// request interceptor
$axios.interceptors.request.use(
  config => {
    const token = storage.get('token')
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) config.headers['token'] = token
    return config
  },
  error => Promise.reject(error)
)

// response interceptor
$axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => Promise.reject(error)
)

export default $axios
