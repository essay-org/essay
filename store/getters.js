export default {
  baseURL(state) {
    let host
    if(process.env.NODE_ENV === 'production') {
      host = 'https://vueblog.86886.wang/v1'
    } else {
      host = `http://127.0.0.1:${process.env.runningPort}/v1`
    }
    return host
  }
}