const token = require('../utils/token.util')

exports.auth = name => async (req, res, next) => {
  const t = req.cookies[name] || req.get(name)
  if (!t) { res.handleError('请登录后操作') }
  try {
    const userInfo = token.verify(t)
    res.locals.user = userInfo
    next()
  } catch (error) {
    res.clearCookie(name)
    res.handleError('Token 无效', error)
  }
}


// 针对token非必须的get接口，如果token无效只返回部分信息
exports.filter = name => (req, res, next) => {
  const t = req.cookies[name] || req.get(name)
  res.locals.user = {}

  if (t) {
    try {
      const userInfo = token.verify(t)
      res.locals.user = userInfo
    } catch (error) {
      res.locals.user = {}
    }
  }
  next()
}
