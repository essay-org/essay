export default function ({ store, error }) {
// 可通过组件的props接收error信息
  if (!store.state.authUser) {
    error({
      message: 'cookie失效或未登录，请登录后操作',
      statusCode: 403
    })
  }
}
