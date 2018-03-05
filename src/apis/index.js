import axios from 'axios'
import {baseUrl} from './env.js'

const TOKEN = '8259a6e8588e7f1b2789b1680209f2f58b6aaf8b'

import qs from 'qs'
import * as Tool from 'UTIL/vuex'
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = baseUrl
axios.defaults.headers.common['Authorization'] = `token ${TOKEN}`
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  let URL = config.url.split(config.baseURL)
  Tool.open(URL[1], config.showLoading)
  return config
}, (error) => {
  Tool.toast('错误的传参', 'fail')
  return Promise.reject(error)
})

// 返回
axios.interceptors.response.use((res) => {
  // console.log(res)
  // 拦截器配置
  // if (res.data.success) {
  //   Tool.toast(res.data.msg)
  //   Tool.close()
  //   return Promise.reject(res)
  // }
  Tool.close()
  return res
}, (error) => {
  Tool.toast('网络异常', 'fail')
  Tool.close()
  return Promise.reject(error)
})

export const oGet = (url, showLoading) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {showLoading: showLoading})
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export const oPost = (url, params, showLoading) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {showLoading: showLoading})
      .then(res => {
        resolve(res.data)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default {
  Login (username, reponame) {
    return oGet(`/repos/${username}/${reponame}`)
  },
  CityList () {
    return oGet(`/city/citylist`)
  },
  UsersList (since) {
    return oGet(`/github/notifications?since=${since}`)
  },
  Notifications (page) {
    return oGet(`/github/notifications?page=${page}`)
  },
  getNews (name, time) {
    if (time) {
      return oGet(`/get?api=/4/news/${name}/${time}`)
    } else {
      return oGet(`/get?api=/4/news/${name}`)
    }
  },
  getNewsById (Id) {
    return oGet(`/get?api=/4/news/${Id}`)
  },
  Get (link) {
    return oGet(link)
  }
}
