import * as types from 'VUEX/mutation-types'
import Loading from 'COMPONENT/vue-loading'

const state = {
  loading: false,
  loadingList: [],
  loadingCounet: 0,
  loadingcountUp: null,
  showToast: false,
  leftNavStatus: false,
  showSuccess: true,
  showFail: false,
  toastMsg: '操作成功',
  showTimePicker: false,
  alertMsg: '退出登录',
  showAlert: false
}

const actions = {
  openLoading ({ commit }, playload) {
    commit(types.COM_PUSH_LOADING, playload)
  },
  closeLoading ({ commit }) {
    commit(types.COM_SHIFT_LOADING)
  },
  setLoadingState ({ commit }, status) {
    commit(types.COM_LOADING_STATUS, status)
  },
  setNavState ({ commit }, status) {
    commit(types.COM_NAV_STATUS, status)
  },
  showToast ({ commit }, status) {
    commit(types.COM_SHOW_TOAST, status)
  },
  showSuccess ({ commit }, status) {
    commit(types.COM_SHOW_SUCCESS, status)
  },
  showFail ({ commit }, status) {
    commit(types.COM_SHOW_FAIL, status)
  },
  toastMsg ({ commit }, str) {
    commit(types.COM_TOAST_MSG, str)
  },
  showAlert ({ commit }, status) {
    commit(types.COM_SHOW_ALERT, status)
  },
  alertMsg ({ commit }, str) {
    commit(types.COM_ALERT_MSG, str)
  },
  showTimePicker ({ commit }, status) {
    commit(types.COM_SHOW_TIME_PICKER, status)
  }
}

const getters = {
  loading: state => state.loading,
  isLoading: state => state.loadingList.length > 0,
  showToast: state => state.showToast,
  showAlert: state => state.showAlert
}

const mutations = {
  [types.COM_LOADING_STATUS] (state, status) {
    state.loading = status
  },
  [types.COM_PUSH_LOADING] (state, playload) {
    state.loadingList.push({text: playload || '玩命加载中...'})
    Loading.open('加载中……')
    state.count = 1
    state.countUp = setInterval(() => {
      state.count += 1
    }, 1000)
  },
  [types.COM_SHIFT_LOADING] (state) {
    state.loadingList.shift()
    Loading.close()
    clearInterval(state.countUp)
  },

  [types.COM_SHOW_TOAST] (state, status) {
    state.showToast = status
  },

  [types.COM_SHOW_SUCCESS] (state, status) {
    state.showSuccess = status
  },

  [types.COM_SHOW_FAIL] (state, status) {
    state.showFail = status
  },

  [types.COM_TOAST_MSG] (state, str) {
    state.toastMsg = str
  },

  [types.COM_NAV_STATUS] (state, status) {
    state.leftNavStatus = status
  },

  [types.COM_SHOW_TIME_PICKER] (state, status) {
    state.showTimePicker = status
  },

  [types.COM_SHOW_ALERT] (state, status) {
    state.showAlert = status
  },
  [types.COM_ALERT_MSG] (state, str) {
    state.alertMsg = str
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
