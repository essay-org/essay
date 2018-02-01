import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../config'
const User = mongoose.model('User')

export default async(ctx, next) => {
  const token = ctx.get('token')
  if (token) {
    const decoded = jwt.verify(token, config.jwt.secret)
    const username = decoded.username
    const userID = decoded.userID
    try {
      let user = await User.findOne({ _id: userID, username: username }).exec()
      if (user._id && user.username) {
        await next()
      } else {
        return (ctx.body = {
          success: false,
          err: 'Token is invalid'
        })
      }
    } catch (e) {
      return (ctx.body = {
        success: false,
        err: e
      })
    }
  } else {
    return (ctx.body = {
      success: false,
      err: 'Please login'
    })
  }
}
