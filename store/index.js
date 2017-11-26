import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

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
    actions,
    mutations,
    getters
  })
}
