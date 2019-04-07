// 验证是否是管理员
export default ({
    store,
    error,
    redirect,
    res,
}) => {
    const { user } = store.state.user
    if (!user || user.role !== 'superAdmin') {
        redirect('/login')
    }
}
