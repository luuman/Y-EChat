const paths = [
  '/user'
]

const useStrategy = {
  target: 'http://test.analysis.yktour.com.cn/ykly-analysis-web',
  changeOrigin: true
}

const proxyTableObj = {}

paths.forEach(path => {
  proxyTableObj[path] = Object.assign({}, useStrategy)
})

module.exports = proxyTableObj
