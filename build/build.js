require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
const shelljs = require('shelljs')
const deploy = require('../deploy')
const dist = path.resolve(__dirname, '../dist')
const packageDir = path.resolve(__dirname, '../package')
// const indexHtml = path.resolve(dist, './index.html')

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  shelljs.mkdir('-p', packageDir)
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    // console.log('同步更新java工程的echart.jsp...')
    // deploy.updateJSP('ykly/server/activity/src/main/webapp/echart.jsp', indexHtml, 'prod', () => {
    //   console.log(chalk.cyan('\n echart.jsp已更新并提交至svn, 开始压缩文件'))
    // })
    deploy.zip(dist, path.resolve(packageDir, './analysis.zip'), zipPath => {
      console.log(chalk.cyan('\n 压缩文件成功'))
      console.log(`\n请将${zipPath}上传到生产环境的静态服务器，并解压复制到static.yktour.com.cn/analysis/ (不要删除原有文件)，然后部署java工程\n`)
    })
  })
})

// require('./check-versions')()

// process.env.NODE_ENV = 'production'

// var ora = require('ora')
// var rm = require('rimraf')
// var path = require('path')
// var chalk = require('chalk')
// var webpack = require('webpack')
// var config = require('../config')
// var webpackConfig = require('./webpack.prod.conf')

// var spinner = ora('building for production...')
// spinner.start()

// rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
//   if (err) throw err
//   webpack(webpackConfig, function (err, stats) {
//     spinner.stop()
//     if (err) throw err
//     process.stdout.write(stats.toString({
//       colors: true,
//       modules: false,
//       children: false,
//       chunks: false,
//       chunkModules: false
//     }) + '\n\n')

//     console.log(chalk.cyan('  Build complete.\n'))
//     console.log(chalk.yellow(
//       '  Tip: built files are meant to be served over an HTTP server.\n' +
//       '  Opening index.html over file:// won\'t work.\n'
//     ))
//   })
// })
