const mongoose = require('mongoose')
const md5 = require('md5')
const config = require('../config')
const User = mongoose.model('User')
const token  = require('../utils/token')

exports.login = async (req, res, next) => {
  let {
    username,
    password
  } = req.body
  password = md5(password)
  try {
    let user = await User.findOne({
      username: username,
      password: password
    }).exec()
    if (user) {
      const t = token.sign(user) 
      res.cookie('adminToken', t)
      res.json({
        success: true,
        data: {
          adminToken: t
        }
      })
    } else {
      res.json({
        success: false,
        err: 'username or password is invalid'
      })
    }
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

exports.logout = (req, res) => {
  res.clearCookie('adminToken')
  res.json({
    success: true,
    data: null
  })
}


exports.getUserInfo = async (req, res, next) => {
  // 用户名必须是唯一的
  let username = res.locals.username
  try {
    let user = await User.findOne({
      username
    }).exec()
    res.json({
      success: true,
      data: user
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

exports.getAdminInfo = async (req, res, next) => {
  const username = config.user.username
  const domain = res.locals.app.domain
  try {
    let user = await User.findOne({
      username
    }).exec()
    user.avatar = domain + '/public/avatar.png'
    res.json({
      success: true,
      data: user
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

exports.patchAdminInfo = async (req, res, next) => {
  let body = req.body
  const username = res.locals.username
  try {
    body.updated_at = Date.now()
    body = await User.findOneAndUpdate({
      username
    }, body).exec()
    res.json({
      success: true,
      data: body
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

exports.patchAdminPassword = async (req, res, next) => {
  let body = req.body
  let username = res.locals.username
  let oldPassword = md5(body.oldPassword)
  let newPassword = md5(body.newPassword)

  try {
    let user = await User.findOne({
      username
    }).exec()
    if (user && user.password !== oldPassword) {
      return(res.json({
        success: false,
        err: 'wrong password'
      }))
    }
    body = await User.findOneAndUpdate({
      username
    }, {
      password: newPassword,
      updated_at: Date.now()
    }).exec()
    res.clearCookie('adminToken')
    res.json({
      success: true,
      data: 'password update succeeded'
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}
