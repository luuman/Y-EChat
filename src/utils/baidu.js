// 还需再次测试
export const hmInstall = () => {
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement('script')
    hm.src = '//hm.baidu.com/hm.js?5cd3b2a05eb8d5583cf8b28dfa4dc4e2'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()
}

export const JoinCount = (Id) => {
  window._hmt.push(['_trackEvent', 'Join Count', Id, '参与'])
}

export const ShareCount = (Id) => {
  window._hmt.push(['_trackEvent', 'cShare Count', Id, '分享'])
}

export const EnterCount = (Id) => {
  window._hmt.push(['_trackEvent', 'cEnter Count', Id, '进入'])
}

export const LoginCount = (Id) => {
  window._hmt.push(['_trackEvent', 'cLogin Count', Id, '注册'])
}
