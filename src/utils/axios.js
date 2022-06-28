import axios from 'axios'
import store from '../store'

const $axios = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000
})

// request interceptor
$axios.interceptors.request.use(
  config => {
    config.headers['token'] = store.state.user.token || undefined
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
