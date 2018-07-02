import globalConfig from '../server/config'
export default {
  baseUrl() {
    let host
    if (process.env.NODE_ENV === 'production' && globalConfig.app.domain) {
      host = `${globalConfig.app.domain}/${globalConfig.app.routerBaseApi}`
    } else {
      host = `http://${globalConfig.app.host}:${globalConfig.app.port}/${globalConfig.app.routerBaseApi}`
    }
    return host
  },
  routerBaseApi() {
    let routerBaseApi =  globalConfig.app.routerBaseApi
    return routerBaseApi
  },
  isGithubConfig() {
    if(globalConfig.githubConfig.githubClient && globalConfig.githubConfig.githubSecret) {
      return true
    }else{
      return false
    }
  },
  isSMTPConfig() {
    if(globalConfig.emailConfig.user && globalConfig.emailConfig.pass) {
      return true
    }else{
      return false
    }
  }
}
