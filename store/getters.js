export default {
  baseURL (state) {
    let host
    if (process.env.NODE_ENV === 'production') {
      host = 'https://vueblog.86886.wang/api'
    } else {
      host = `http://127.0.0.1:3010/api`
    }
    return host
  }
}
