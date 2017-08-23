import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import mutations from './mutations.js'
Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      articleList: [],
      administrator: [],
      articleDetail: '',
      total: '',
      tags: [],
      archives: [],
      articles: {},
      cookies: {}
    },
    actions,
    mutations
  })
}
