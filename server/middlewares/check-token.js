import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../config'
import axios from 'axios'
const User = mongoose.model('User')

export const checkToken = async(ctx, next) => {
  let cookie = ctx.get('Cookie'),
    cookieObj = {},
    cookieArr = [],
    key = '',
    value = '';
  cookie = cookie.split(';')
  for (let i = 0; i < cookie.length; i++) {
    cookieArr = cookie[i].trim().split('=')
    key = cookieArr[0]
    value = cookieArr[1]
    cookieObj[key] = value
  }
  // console.log(cookieObj.token)
  if (cookieObj.token) {
    const decoded = jwt.verify(cookieObj.token, config.jwt.secret)
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

export const checkGithubToken = async(ctx, next) => {
  let cookie = ctx.get('Cookie'),
    cookieObj = {},
    cookieArr = [],
    key = '',
    value = '';
  cookie = cookie.split(';')
  for (let i = 0; i < cookie.length; i++) {
    cookieArr = cookie[i].trim().split('=')
    key = cookieArr[0]
    value = cookieArr[1]
    cookieObj[key] = value
  }
  // console.log(cookieObj.token)
  if (cookieObj.githubToken) {

  }
}
