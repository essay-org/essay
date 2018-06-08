import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default () => {
  return new Vuex.Store({
    state: {
      token: '',
      githubToken: '',
      user: {},
      articles: {},
      githubApi:{
        userInfo: 'https://api.github.com/user?access_token='
      }
    },
    getters,
    mutations,
    actions
  })
}
