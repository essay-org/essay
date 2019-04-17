/*
 * @Author: wmui
 * @GitHub: https://github.com/wmui
 * @License: GPL-3.0
 */
const mongoose = require('mongoose')
const axios = require('axios')
const config = require('../../config')
const token = require('../../utils/token')
const logger = require('../../utils/log')

const User = mongoose.model('User')


let state = ''
exports.githubLogin = (req, res) => {
    state = req.params.state || ''
    const { domain } = config.app
    const u = `https://github.com/login/oauth/authorize?client_id=${config.github.id}&scope=${config.github.scope}&redirect_uri=${domain}/api/oauth/github/callback&state=${state}`

    res.status(302).set('location', u).end()
}

// 授权成功后的回调函数
exports.githubCallback = async (req, res, next) => {
    const { query } = req
    const u = `https://github.com/login/oauth/access_token?client_id=${config.github.id}&client_secret=${config.github.secret}&code=${query.code}&state=${state}`
    let githubToken = ''
    const userInfo = {}

    await axios.get(u).then((ret) => {
        const {
            data,
        } = ret
        const arr = data.split('&')
        const obj = {}
        arr.forEach((item) => {
            const key = item.split('=')[0]
            const value = item.split('=')[1]
            obj[key] = value
        })
        if (obj.access_token) {
            githubToken = obj.access_token
        }
    }).catch((err) => {
        logger(err)
    })

    if (githubToken) {
        await axios.get(`https://api.github.com/user?access_token=${githubToken}`)
            .then((ret) => {
                const {
                    data,
                } = ret

                userInfo.username = data.login
                userInfo.email = data.email
                userInfo.description = data.bio
                userInfo.avatar = data.avatar_url
            })

        let user = await User.findOne({
            username: userInfo.username,
        }).exec()

        if (!user) {
            user = await new User(userInfo).save()
        }
        const t = token.sign(user)
        res.cookie('token', t, {
            maxAge: config.jwt.expiresIn * 1000, // 与jwt有限期一致，cookie是毫秒
            httpOnly: true,
            domain: res.locals.cookieDomain,
        })
    }

    res.redirect(`${config.app.domain}/posts/${state}`)
}
