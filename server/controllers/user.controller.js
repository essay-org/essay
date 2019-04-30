const mongoose = require('mongoose')
const md5 = require('md5')
const _ = require('lodash')
const globalConfig = require('../config/global.config')
const token = require('../utils/token.util')

const User = mongoose.model('User')

exports.postUser = async (req, res, nest) => {
    const { body } = req
    let user = await User.findOne({
        email: body.email,
    }).exec()
    if (user) {
        res.json({
            success: false,
            message: '邮箱已被注册',
        })
        return
    }
    user = await User.findOne({
        username: body.username,
    }).exec()
    if (user) {
        res.json({
            success: false,
            message: '用户名已被占用',
        })
        return
    }
    // 注册
    try {
        // 生成随机头像
        const avatar = body.avatar
            ? body.avatar
            : `${globalConfig.app.domain}/public/avatar/${_.random(1, 9)}.jpg`
        user = await new User({
            ...body,
            avatar,
        }).save()
        res.json({
            success: true,
            data: user,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '注册失败',
            error,
        })
    }
}

exports.login = async (req, res, next) => {
    const { body } = req
    if (md5(body.code) !== req.cookies.code) {
        res.json({
            success: false,
            message: '请输入正确的验证码',
        })
        return
    }
    try {
        const user = await User.findOne({
            email: body.email,
            password: body.password,
        }).exec()
        if (user) {
            const t = token.sign(user)
            res.cookie('token', t, {
                maxAge: globalConfig.jwt.expiresIn * 1000, // 与jwt有限期一致，cookie是毫秒
                httpOnly: true,
            })
            res.clearCookie('code')
            res.json({
                success: true,
                data: {
                    token: t,
                },
            })
        } else {
            res.json({
                success: false,
                message: '用户名或密码错误',
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: '登录失败',
            error,
        })
    }
}

exports.logout = (req, res) => {
    res.clearCookie('token')
    res.json({
        success: true,
        data: {},
    })
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).exec()
        res.json({
            success: true,
            data: users,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '获取用户列表失败',
            error,
        })
    }
}

exports.getUserInfo = async (req, res, next) => {
    const state = {
        1: req.params.id || '',
        2: res.locals.user ? res.locals.user.userId : '',
    }
    const userId = state[1] || state[2]

    try {
        const user = await User.findOne({
            _id: userId,
        }).select('-createdAt -updatedAt').exec()
        res.json({
            success: true,
            data: user,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '信息获取失败',
            error,
        })
    }
}

exports.patchUserInfo = async (req, res, next) => {
    let { body } = req
    const {
        userId,
    } = res.locals.user
    try {
        body = await User.findOneAndUpdate({
            _id: userId,
        }, body).exec()
        res.json({
            success: true,
            data: body,
        })
    } catch (error) {
        res.json({
            success: false,
            message: '信息修改失败',
            error,
        })
    }
}

exports.patchPassword = async (req, res, next) => {
    const {
        oldPassword,
        newPassword,
    } = req.body
    const {
        userId,
    } = res.locals.user
    const realOldPassword = md5(oldPassword)
    try {
        const user = await User.findOne({
            _id: userId,
        }).exec()
        if (user && user.password !== realOldPassword) {
            res.json({
                success: false,
                message: '原始密码错误',
            })
            return
        }
        await User.findOneAndUpdate({
            _id: userId,
        }, {
            password: newPassword,
        }).exec()
        res.clearCookie('token')
        res.json({
            success: true,
            data: {},
        })
    } catch (error) {
        res.json({
            success: false,
            message: '密码修改失败',
            error,
        })
    }
}
