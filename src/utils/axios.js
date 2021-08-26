/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */
import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://backend-api-01.newbee.ltd/api/v1' : 'http://backend-api-01.newbee.ltd/api/v1'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// 设置请求头信息
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 设置超时时间
axios.defaults.timeout = 10000
// 请求拦截器
// axios.interceptors.request.use(config => {
//   config => {
// 每次发送请求之前判断是否存在token
//如果存在，则统一在http请求上的header上加上token,这样后台根据token判断你的登录情况，此处token一般是用户完成登录后储存到localstorage里的
//     token && (config.headers.Authorization = token)
//     return config
//   }
//   error => {
//     return Promise.error(error)
//   }
// })
// 响应拦截器
axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.resultCode !== 200) {
    if (res.data.message) Toast.fail(res.data.message)
    if (res.data.resultCode === 416) {
      router.push({ path: '/login' })
    }
    return Promise.reject(res.data)
  }
  return res.data
})

export default axios
