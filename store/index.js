import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default () => {
  return new Vuex.Store({
    state: {
      articleList: [],
      tags: [],
      archives: [],
      articles: [],
      administrator: {},
      articleDetail: {},
      status: {},
      total: '',
      category: '',
      page: '',
      token: ''
    },
    getters,
    mutations,
    actions
  })
}
