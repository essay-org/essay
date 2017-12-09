export default {
  baseURL(state) {
    let host
    if (process.browser) {
      host = `${window.location.origin}/v1`
    } else {
      host = `http://127.0.0.1:${process.env.runningPort}/v1`
    }
    return host
  }
}