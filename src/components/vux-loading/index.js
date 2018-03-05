import LoadingComponent from './loading'
// import { mergeOptions } from '../../libs/plugin_helper'

let $vm
let watcher

const plugin = {
  install (vue, options) {
    const LoadingC = vue.extend(LoadingComponent)
    if (!$vm) {
      $vm = new LoadingC({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const Loading = {
      show (options = {}) {
        // destroy watcher
        watcher && watcher()
        if (typeof options === 'string') {
          $vm.text = options
        } else if (typeof options === 'object') {
          // mergeOptions($vm, options)
        }
        if (typeof options === 'object' && options.onShow || options.onHide) {
          watcher = $vm.$watch('show', (val) => {
            val && options.onShow && options.onShow($vm)
            val === false && options.onHide && options.onHide($vm)
          })
        }
        $vm.show = true
      },
      hide () {
        $vm.show = false
      }
    }
    vue.mixin({
      created: function () {
        this.$Loading = Loading
        window.Loading = Loading
      }
    })
  }
}

export default plugin
export const install = plugin.install
