// 验证是否有管理权限
export default ({
  store,
  error,
  redirect,
  res,
}) => {
  const { token } = store.state
  if (!token) {
    redirect('/login')
  }
}
