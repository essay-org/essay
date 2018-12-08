const mongoose = require('mongoose')
const User = mongoose.model('User')
const token = require('../utils/token')

module.exports = (type) => {
  return async (req, res, next) => {
    const t = req.cookies[type] || req.get('Token')

    if (!t) {
      return (res.json({
        success: false,
        err: 'please login'
      }))
    }

    try {
      const {
        userID,
        username
      } = token.verify(t)
      let user = await User.findOne({
        username: username
      }).exec()

      if (user && user._id && user.username) {
        res.locals.username = username
        await next()
      } else {
        res.json({
          success: false,
          err: 'token is invalid'
        })
      }
    } catch (e) {
      res.json({
        success: false,
        err: e
      })
    }
  }
}
