import config from '../config'
import axios from 'axios'
import url from 'url'
import mongoose from 'mongoose'

const User = mongoose.model('User')

// state表示github授权后的回调信息
let state = ''
export const login = (ctx, next) => {
  state = ctx.params.state || ''
  let u = `https://github.com/login/oauth/authorize?client_id=${config.githubConfig.githubClient}&scope=${config.githubConfig.scope}&redirect_uri=${ctx.protocol}://${ctx.host}/api/oauth/github/callback&state=${state}`
    ctx.res.statusCode = 302
    ctx.res.setHeader('location', u)
    ctx.res.end()
}

// 授权成功后的回调函数
export const callback = async (ctx, next) => {
  let query = url.parse(ctx.req.url, true).query
  let code = query.code
  let u = `https://github.com/login/oauth/access_token?client_id=${config.githubConfig.githubClient}&client_secret=${config.githubConfig.githubSecret}&code=${code}&state=${state}`
  let githubToken = ''

  // 把获取到的token设置到cookie里
  await axios.get(u).then((ret) => {
    const {data} = ret
    var arr = data.split('&'),obj = {}
    arr.forEach(function(item){
      var key = item.split('=')[0]
      var value = item.split('=')[1]
      obj[key] = value
    })
    if(obj.access_token) {
      githubToken = obj.access_token
      ctx.cookies.set('githubToken', obj.access_token)
    }else {
      ctx.cookies.set('githubToken', '')
    }
  })
  if(githubToken) {
    let userInfo = {}
    // 把用户信息保存到数据库
    await axios.get(`https://api.github.com/user?access_token=${githubToken}`).then(ret => {
      const {data} = ret
      userInfo.role = 'user'
      userInfo.username = data.login
      userInfo.email = data.email
      userInfo.nickname = data.name
      userInfo.motto = data.bio
      userInfo.avatar = data.avatar_url
    })

    var user = await User.findOne({ username: userInfo.username }).exec()
    if(!user) {
      user = new User(userInfo)
      await user.save()
    }
  }
  // 完成授权后页面重定向
  return ctx.response.redirect(`${ctx.protocol}://${ctx.host}/detail/${state}`)
}
