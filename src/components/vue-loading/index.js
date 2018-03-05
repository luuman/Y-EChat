import Vue from 'vue'

const Indicator = Vue.extend(require('./loading.vue'))
let instance

export default {
  open (options = {}) {
    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div')
      })
    }
    if (instance.value) return
    instance.text = typeof options === 'string' ? options : options.text || ''
    instance.spinnerType = options.spinnerType || 'snake'
    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
      instance.value = true
    })
  },

  close () {
    if (instance) {
      instance.value = false
    }
  }
}
