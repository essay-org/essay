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
      category: '',
      page: '',
      cookies: {}
    },
    actions,
    mutations,
    getters
  })
}
