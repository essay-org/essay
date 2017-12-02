export default {
  baseURL (state) {
    let host
    if (process.env.NODE_ENV === 'production') {
      host = 'http://198.13.32.165:8080/v1'
    } else {
      host = 'http://127.0.0.1:8080/v1'
    }
    return host
  }
}
