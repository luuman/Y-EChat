// html2canvas

export const addCanvas = (DivId, scale, callback) => {
  let w = document.getElementById(DivId).scrollWidth
  let h = document.getElementById(DivId).scrollHeight
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  canvas.width = w * scale
  canvas.height = h * scale
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
  context.scale(scale, scale)
  return canvas
}

export const getHtmlBase64 = (DivId, scale, callback) => {
  // 英文会自动换行，但不是很清晰！
  require('!!script-loader!../../static/html2canvas/0.4.1/html2canvas.js')
  let canvas = addCanvas(DivId, scale, callback)
  window.html2canvas(document.getElementById(DivId), {
    canvas: canvas,
    onrendered: function (canvas) {
      let image = canvas.toDataURL('image/png')
      callback(image)
    }
  })
}

export const getHtmlBase64beta = (DivId, scale, callback) => {
  // https://html2canvas.hertzen.com/documentation.html
  require('!!script-loader!../../static/html2canvas/0.5.0-beta4/html2canvas.js')
  let canvas = addCanvas(DivId, scale, callback)
  let options = {
    // 检测每张图片都已经加载完成
    // tainttest: true,
    // 允许加载跨域的图片
    // allowTaint: true,
    // Whether to attempt to load cross-origin images as CORS served, before reverting back to proxy
    useCORS: true,
    // proxy: '',
    // background: '#FFF',
    // 字母间距
    // letterRendering: true,
    // 日志开关
    // logging: true,
    // 自定义 canvas
    canvas: canvas
  }
  window.html2canvas(document.getElementById(DivId), options).then((canvas) => {
    let image = canvas.toDataURL('image/png')
    callback(image)
  })
}

export const getHtmlBase64alpha = (DivId, scale, callback) => {
  require('!!script-loader!../../static/html2canvas/0.5.0-alpha1/html2canvas.js')
  let canvas = addCanvas(DivId, scale, callback)
  window.html2canvas(document.getElementById(DivId), {
    canvas: canvas,
    onrendered: function (canvas) {
      let image = canvas.toDataURL('image/png')
      callback(image)
    }
  })
}

export const getBase64Image = (imgurl) => {
  let image = new Image()
  let isLoad = false
  image.crossOrigin = ''
  image.src = imgurl
  image.onload = function () {
    isLoad = true
  }
  if (isLoad) {
    // console.log(isLoad)
    return getCanvas(image)
  } else {
    // console.log(isLoad)
  }
}

export const getCanvas = (img) => {
  var canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  var dataURL = canvas.toDataURL('image/' + ext)
  return dataURL
}

// class ImagePreloader {
//   loadManifest (manifest) {
//     var promises = []
//     for (var i = 0; i < manifest.length; i++) {
//       promises.push(this.loadImage(manifest[i]))
//     }
//     return Promise.all(promises)
//   }
//   loadImage (src) {
//     let image = new Image()
//     image.crossOrigin = 'Anonymous'
//     return new Promise((resolve, reject) => {
//       image.onload = () => {
//         resolve(image)
//       }
//       image.onerror = () => {
//         reject()
//       }
//       image.src = src
//     })
//   }
// }
