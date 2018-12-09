import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default () => {
  return new Vuex.Store({
    state: {
      adminToken: '',
      localToken: '',
      user: {},
      total: 0,
      articles: [],
      drafts: [],
      articleDetail: {},
      tags: [],
      stickArticles:[],
      tagArticles: [],
      searchArticles: [],
      limit: 10,
      app: {},
    },
    getters,
    mutations,
    actions
  })
}
