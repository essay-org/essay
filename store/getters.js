export default {
  baseUrl() {
    let host
    if (process.env.NODE_ENV === 'production') {
      host = 'https://www.86886.wang/v1'
    } else {
      host = 'http://127.0.0.1:3000/v1'
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
