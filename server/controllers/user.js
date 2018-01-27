import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import config from '../config'

const User = mongoose.model('User')

export const login = async(ctx, next) => {
  let { username, password } = ctx.request.body
  password = md5(password)
  try {
    let user = await User.findOne({username: username, password: password}).exec()
    let secret = config.jwt.secret
    let expiresIn = config.jwt.expiresIn
    let token = jwt.sign({ username: user.username, userID: user._id }, secret)
    ctx.cookies.set('token', token)
    ctx.body = {
      success: true,
      data: {
        token: token
      }
    }
  } catch (e) {
    ctx.body = {
      success: false,
      data: e
    }
  }
}

export const logout = async(ctx, next) => {
  ctx.cookies.set('token', null)
  ctx.body = {
    success: true,
    data: {}
  }
}

export const getUserInfo = async(ctx, next) => {
  let avatarUrl = ctx.protocol + '://' + ctx.host + '/public/' + config.user.avatar
  try {
    let data = await User.findOne({ role: 'superAdmin' }).exec()
    data.avatar = avatarUrl
    ctx.body = {
      success: true,
      data: data
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
}

export const patchUserInfo = async(ctx, next) => {
  let body = ctx.request.body

  if (body.oldPassword && body.newPassword) {
    // update password
    let oldPassword = md5(body.oldPassword)
    let newPassword = md5(body.newPassword)
    try {
      let user = await User.findOne({ role: 'superAdmin' }).exec()
      if (user.password !== oldPassword) {
        return (ctx.body = {
          success: false,
          err: 'Wrong password'
        })
      }
      body = await User.findOneAndUpdate({ role: 'superAdmin' }, { password: newPassword, updatedAt: Date.now() }).exec()
      ctx.body = {
        success: true,
        data: body
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  } else {
    // update info
    body.updatedAt = Date.now()
    try {
      body = await User.findOneAndUpdate({ role: 'superAdmin' }, body).exec()
      ctx.body = {
        success: true,
        data: body
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
  }
}
