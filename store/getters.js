import globalConfig from '../server/config'
export default {
  baseUrl() {
    let host
    if (process.env.NODE_ENV === 'production') {
      host = globalConfig.production.domain + globalConfig.app.routerBaseApi
    } else {
      host = `http://${globalConfig.app.host}:${globalConfig.app.port}${globalConfig.app.routerBaseApi}`
    }
    return host
  },
  routerBaseApi() {
    let baseApi = globalConfig.app.routerBaseApi
    return baseApi
  }
}
