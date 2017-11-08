import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default () => {
  return new Vuex.Store({
    state: {
      articleList: [],
      administrator: {},
      articleDetail: '',
      total: '',
      tags: [],
      archives: [],
      articles: {},
      cookies: {}
    },
    actions,
    mutations,
    getters
  })
}
