import axios from 'axios'
// import {baseUrl} from './env.js'

// const TOKEN = '8259a6e8588e7f1b2789b1680209f2f58b6aaf8b'

import qs from 'qs'
import * as Tool from 'UTIL/vuex'
// axios 配置
axios.defaults.timeout = 5000
// axios.defaults.baseURL = baseUrl
// axios.defaults.headers.common['Authorization'] = `token ${TOKEN}`
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
  Login (userName, passWord) {
    return oPost(`/ykly-analysis-web/user/common/login`, {userName, passWord})
  },
  // 出游人数、营业额、返佣
  AllGpMonth () {
    return oGet(`/ykly-analysis-web/analysis/report/query/queryForStatisticsGpMonth`)
  },
  GpMonth (provinceName, categoryLargeName) {
    return oGet(`/ykly-analysis-web/analysis/report/query/queryForStatisticsGpMonth?provinceName=${provinceName}&categoryLargeName=${categoryLargeName}`)
  },
  queryRevenue (dataType, orderYear, orderMonth) {
    return oGet(`/ykly-analysis-web/analysis/travel/query/queryRevenue?dataType=${dataType}&orderYear=${orderYear}&orderMonth=${orderMonth}`)
  },
  // 所有订单数量
  queryForOrderCount (theMonth) {
    return oGet(`/ykly-analysis-web/analysis/report/query/queryForOrderCount?theMonth=${theMonth}`)
  },
  Get (link) {
    return oGet(link)
  },
  loadSaleByOrdertype (year, month, province) {
    return oGet(`/ykly-analysis-web/analysis/report/query/queryForStatisticsGpcategoryLargeName?theYear=${year}&theMonth=${month}&provinceName=${province}`)
  }
}
