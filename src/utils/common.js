/**
 * 浏览器UA
 */
export const parseUA = () => {
  let u = navigator.userAgent.toLowerCase() || window.navigator.userAgent.toLowerCase()
  return {
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    Mobile: /(Mobile)/i.test(u),
    MobileAll: u.indexOf('Android') > -1 || u.indexOf('iPhone') > -1 || u.indexOf('SymbianOS') > -1 || u.indexOf('Windows Phone') > -1 || u.indexOf('iPad') > -1 || u.indexOf('iPod') > -1,
    wPhone: /(Windows Phone|windows[\s+]phone)/i.test(u),
    PC: u.indexOf('Win') > -1 || u.indexOf('Mac') > -1 || u.indexOf('Linux') > -1,
    weixin: u.indexOf('MicroMessenger') > -1,
    ykly: u.indexOf('ykly') > -1,
    yIos: u.indexOf('ykly_ios_app') > -1,
    yAndroid: u.indexOf('ykly_android_app') > -1
  }
}

/**
 * 浏览器UA
 */
import Loading from 'COMPONENT/vue-loading'
export const downLoad = (url) => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  Loading.open('生成中……')
  window.setTimeout(() => {
    Loading.close()
  }, 3000)
  // iframe.onload = function () {
  //   console.log('shod')
  //   document.body.removeChild(iframe)
  //   Loading.close()
  // }
  document.body.appendChild(iframe)
}

/**
 * 网页标题修改
 */
export const setDocumentTitle = (title) => {
  'use strict'
  if (!title) return
  setTimeout(function () {
    // 利用iframe的onload事件刷新页面
    document.title = title
    var iframe = document.createElement('iframe')
    // iframe.src = '/favicon.ico' // 必须
    iframe.style.visibility = 'hidden'
    iframe.style.width = '1px'
    iframe.style.height = '1px'
    iframe.onload = function () {
      setTimeout(function () {
        document.body.removeChild(iframe)
      }, 0)
    }
    document.body.appendChild(iframe)
  }, 0)
}

/**
 * 加载JavaScript文件
 */
export const loadScript = (url, callback) => {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = 'async'
  script.src = url
  document.body.appendChild(script)
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'complete' || script.readyState === 'loaded') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    script.onload = function () {
      callback()
    }
  }
}

/**
 * 微信授权页面
 */
export const urlAuthWechat = (appid, link) => {
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(link)}&response_type=code&scope=snsapi_base#wechat_redirect`
}

/* 获取url的一个参数值 */
export const getUrlObj = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r !== null) return decodeURI(r[2])
  return null
}

/* 获取url的参数对象 */
export const getUrlJson = () => {
  let json = {}
  let arr = window.location.search.substr(1).split('&')
  for (var i = 0; i < arr.length; i++) {
    let tempArr = arr[i].split('=')
    json[tempArr[0]] = tempArr[1]
  }
  return json
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop
  } else if (element.currentStyle) {
    target = element.currentStyle[attr]
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr]
  }
  // 在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode === 'float' ? parseFloat(target) : parseInt(target)
}

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
  let windowHeight = window.screen.height
  let height
  let setTop
  let paddingBottom
  let marginBottom
  let requestFram
  let oldScrollTop

  document.body.addEventListener('scroll', () => {
    loadMore()
  }, false)
  // 运动开始时获取元素 高度 和 offseTop, pading, margin
  element.addEventListener('touchstart', () => {
    height = element.offsetHeight
    setTop = element.offsetTop
    paddingBottom = getStyle(element, 'paddingBottom')
    marginBottom = getStyle(element, 'marginBottom')
  }, {passive: true})

  // 运动过程中保持监听 scrollTop 的值判断是否到达底部
  element.addEventListener('touchmove', () => {
    loadMore()
  }, {passive: true})

  // 运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
  element.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop
    moveEnd()
  }, {passive: true})
  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop !== oldScrollTop) {
        oldScrollTop = document.body.scrollTop
        loadMore()
        moveEnd()
      } else {
        cancelAnimationFrame(requestFram)
        // 为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
        height = element.offsetHeight
        loadMore()
      }
    })
  }
  const loadMore = () => {
    if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
      callback()
    }
  }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
  let requestFram
  let oldScrollTop

  document.addEventListener('scroll', () => {
    showBackFun()
  }, false)
  document.addEventListener('touchstart', () => {
    showBackFun()
  }, {passive: true})

  document.addEventListener('touchmove', () => {
    showBackFun()
  }, {passive: true})

  document.addEventListener('touchend', () => {
    oldScrollTop = document.body.scrollTop
    moveEnd()
  }, {passive: true})
  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (document.body.scrollTop !== oldScrollTop) {
        oldScrollTop = document.body.scrollTop
        moveEnd()
      } else {
        cancelAnimationFrame(requestFram)
      }
      showBackFun()
    })
  }
  // 判断是否达到目标点
  const showBackFun = () => {
    if (document.body.scrollTop > 500) {
      callback(true)
    } else {
      callback(false)
    }
  }
}

/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
  clearInterval(element.timer)

  // 判断不同参数的情况
  if (duration instanceof Function) {
    callback = duration
    duration = 400
  } else if (duration instanceof String) {
    mode = duration
    duration = 400
  }

  // 判断不同参数的情况
  if (mode instanceof Function) {
    callback = mode
    mode = 'ease-out'
  }

  // 获取dom样式
  const attrStyle = attr => {
    if (attr === 'opacity') {
      return Math.round(getStyle(element, attr, 'float') * 100)
    } else {
      return getStyle(element, attr)
    }
  }
  // 根字体大小，需要从此将 rem 改成 px 进行运算
  const rootSize = parseFloat(document.documentElement.style.fontSize)

  const unit = {}
  const initState = {}

  // 获取目标属性单位和初始样式值
  Object.keys(target).forEach(attr => {
    if (/[^\d^.]+/gi.test(target[attr])) {
      unit[attr] = target[attr].match(/[^\d^.]+/gi)[0] || 'px'
    } else {
      unit[attr] = 'px'
    }
    initState[attr] = attrStyle(attr)
  })

  // 去掉传入的后缀单位
  Object.keys(target).forEach(attr => {
    if (unit[attr] === 'rem') {
      target[attr] = Math.ceil(parseInt(target[attr]) * rootSize)
    } else {
      target[attr] = parseInt(target[attr])
    }
  })
  let flag = true
  const remberSpeed = {}
  element.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      let iSpeed = 0
      let status = false
      let iCurrent = attrStyle(attr) || 0
      let speedBase = 0
      let intervalTime
      switch (mode) {
        case 'ease-out':
          speedBase = iCurrent
          intervalTime = duration * 5 / 400
          break
        case 'linear':
          speedBase = initState[attr]
          intervalTime = duration * 20 / 400
          break
        case 'ease-in':
          let oldspeed = remberSpeed[attr] || 0
          iSpeed = oldspeed + (target[attr] - initState[attr]) / duration
          remberSpeed[attr] = iSpeed
          break
        default:
          speedBase = iCurrent
          intervalTime = duration * 5 / 400
      }
      if (mode !== 'ease-in') {
        iSpeed = (target[attr] - speedBase) / intervalTime
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
      }
      // 判断是否达步长之内的误差距离，如果到达说明到达目标点
      switch (mode) {
        case 'ease-out':
          status = iCurrent !== target[attr]
          break
        case 'linear':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed)
          break
        case 'ease-in':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed)
          break
        default:
          status = iCurrent !== target[attr]
      }

      if (status) {
        flag = false
        // opacity 和 scrollTop 需要特殊处理
        if (attr === 'opacity') {
          element.style.filter = 'alpha(opacity:' + (iCurrent + iSpeed) + ')'
          element.style.opacity = (iCurrent + iSpeed) / 100
        } else if (attr === 'scrollTop') {
          element.scrollTop = iCurrent + iSpeed
        } else {
          element.style[attr] = iCurrent + iSpeed + 'px'
        }
      } else {
        flag = true
      }

      if (flag) {
        clearInterval(element.timer)
        if (callback) {
          callback()
        }
      }
    })
  }, 20)
}
