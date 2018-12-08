export default {
  baseUrl() {
    let host
    if (process.env.NODE_ENV === 'production') {
      host = 'https://api.86886.wang/v1'
    } else {
      // host = 'http://127.0.0.1:3010/v1'
      host = 'https://api.86886.wang/v1' // 仅能查看结果
    }
    return host
  },
  isGithubConfig() {
    return false
  },
  isSMTPConfig() {
    return false
  }
}
