import axios from 'axios'

import { Message } from 'element-ui'

const service = axios.create({
  baseURL: 'api/',
  timeout: 30000
})

service.interceptors.request.use(
  config => config,
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  async response => {
    return response
  },
  error => {
    console.log('err' + error)
    Message({
      message: '请求超时,请刷新页面重新加载',
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
