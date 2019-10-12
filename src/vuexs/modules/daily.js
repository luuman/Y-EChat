// import api from 'API'
import * as types from 'VUEX/mutation-types'

const state = {
  article: [],
  articleID: ''
}

const getters = {
  articleID: state => state.articleID,
  article: state => state.article
}

const actions = {
  addArticle ({ commit }, res) {
    commit(types.COM_PUSH_ARTICLE, res)
  },
  pushId ({ commit }, Id, res) {
    console.log(res)
    commit(types.COM_PUSH_ARTICLEID, Id)
  }
}

const mutations = {
  [types.COM_PUSH_ARTICLE] (state, res) {
    state.article[state.articleID] = res
  },
  [types.COM_PUSH_ARTICLEID] (state, Id) {
    state.articleID = Id
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
