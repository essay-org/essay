import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../config'
import axios from 'axios'
const User = mongoose.model('User')

function parseCookies(cookies) {
  let cookie = cookies.split(';'), cookieObj = {}, cookieArr = [], key = '', value = '';
  for (let i = 0; i < cookie.length; i++) {
    cookieArr = cookie[i].trim().split('=')
    key = cookieArr[0]
    value = cookieArr[1]
    cookieObj[key] = value
  }
  return cookieObj
}
export const checkToken = async(ctx, next) => {
  // 可以从cookie里面获得token，也可以从request header里获取token
  let cookieObj = parseCookies(ctx.get('Cookie')), token = ''
  if(cookieObj && cookieObj.token) {
    token = cookieObj.token
  }else if(ctx.get('token')) {
    token = ctx.get('token')
  }else{
    token = ''
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret)
      const username = decoded.username
      const userID = decoded.userID
      let user = await User.findOne({ _id: userID, username: username }).exec()
      if (user._id && user.username) {
        ctx.state.username = username
        await next() // token有效
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
  let githubToken = ctx.get('githubToken')
  if (githubToken) {
    try {
      const { data } = await axios.get('https://api.github.com/user?access_token=' + githubToken)
      // 用户存在
      let user = await User.findOne({ username: data.login })
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
