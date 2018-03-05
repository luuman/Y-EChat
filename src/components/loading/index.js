// import defer from './defer.js'
import Loading from './loading.vue'

// 默认选项
const defaults = {
  defaultOption: 'title',
  title: null,
  text: null,
  input: false,
  placeholder: '',
  cancelText: 'Cancel',
  okText: 'OK',
  mask: false,
  remindDuration: 650
}

function install (Vue, globalOptions = {}) {
  if (typeof globalOptions !== 'object') {
    throw new Error('Expect Object options')
  }

  const LoadingViewComponent = Vue.extend(Loading)

  // override defaults
  Object.assign(defaults, globalOptions)

  function getPropsData (options = {}) {
    let propsData = Object.assign({}, defaults)

    if (typeof options === 'string') {
      propsData[defaults.defaultOption] = options
    } else {
      propsData = Object.assign(propsData, options)
    }

    return propsData
  }

  function LoadingView (options) {
    var propsData = getPropsData(options)

    var instance = new LoadingViewComponent({propsData: propsData})

    var mount = document.createElement('div')
    mount.id = 'loading' + Date.now()
    document.body.appendChild(mount)

    instance.$mount(mount)

    // return instance.activate()
  }

  Vue.prototype.$Loading = LoadingView
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default install
