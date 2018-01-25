import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import globalConfig from '../server/config'

export default () => {
  return new Vuex.Store({
    state: {
      token: '',
      baseURL: `http://${globalConfig.app.baseUrl}:${globalConfig.app.port}${globalConfig.app.routerBaseApi}`,
      routerBaseApi: globalConfig.app.routerBaseApi
    },
    getters,
    mutations,
    actions
  })
}
