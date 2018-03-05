const paths = [
  '/product',
  '/member',
  '/appindex',
  '/httpRequest',
  '/coupon',
  '/scenicProduct',
  '/excursions',
  '/order',
  '/pay',
  '/visa',
  '/appProduct',
  '/cruise',
  '/index',
  '/collection',
  '/touristinfo',
  '/comaddress'
]

const useStrategy = {
  target: 'http://test.m.yktour.com.cn',
  changeOrigin: true
}

const proxyTableObj = {}

paths.forEach(path => {
  proxyTableObj[path] = Object.assign({}, useStrategy)
})

module.exports = proxyTableObj
