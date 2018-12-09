const mongoose = require('mongoose')
const axios = require('axios')
const config = require('../config')
const User = mongoose.model('User')
const token = require('../utils/token')

// state表示github授权后的回调信息
let state = ''
exports.githubLogin = (req, res) => {
  state = req.params.state || ''
  const domain = res.locals.app.domain
  const u = `https://github.com/login/oauth/authorize?client_id=${config.githubConfig.githubClient}&scope=${config.githubConfig.scope}&redirect_uri=${domain}/v1/oauth/github/callback&state=${state}`
  
  res.status(302).set('location', u).end()
}

// 授权成功后的回调函数
exports.githubCallback = async (req, res, next) => {
  let query = req.query
  let u = `https://github.com/login/oauth/access_token?client_id=${config.githubConfig.githubClient}&client_secret=${config.githubConfig.githubSecret}&code=${query.code}&state=${state}`
  let githubToken = '',
    userInfo = {}

  await axios.get(u).then((ret) => {
    const {
      data
    } = ret
    let arr = data.split('&'),
      obj = {}
    arr.forEach(function (item) {
      let key = item.split('=')[0]
      let value = item.split('=')[1]
      obj[key] = value
    })
    if (obj.access_token) {
      githubToken = obj.access_token
    }
  })

  if (githubToken) {
    await axios.get(`https://api.github.com/user?access_token=${githubToken}`)
      .then(ret => {
        const {
          data
        } = ret
        userInfo.username = data.login
        userInfo.email = data.email
        userInfo.nickname = data.name
        userInfo.motto = data.bio
        userInfo.avatar = data.avatar_url
      })

    let user = await User.findOne({
      username: userInfo.username
    }).exec()

    if (!user) {
      user = new User(userInfo)
      await user.save()
    } else {
      const t = token.sign(user)
      res.cookie('localToken', t)
      return res.redirect(`${res.locals.app.domain}/detail/${state}`)
    }
  }
}
