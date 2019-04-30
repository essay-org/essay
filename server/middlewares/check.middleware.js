const mongoose = require('mongoose')

const User = mongoose.model('User')
const token = require('../utils/token.util')

exports.auth = (name, required = true) => async (req, res, next) => {
    const t = req.cookies[name] || req.get(name)
    if (!t) {
        res.json({
            success: false,
            message: '请登录后操作',
        })
        return
    }
    try {
        const userInfo = token.verify(t)
        res.locals.user = userInfo || {}
        next()
    } catch (error) {
        res.clearCookie(name)
        res.json({
            success: false,
            message: 'Token 无效',
            error,
        })
    }
}


// 针对token非必须的get接口
exports.filter = name => (req, res, next) => {
    const t = req.cookies[name] || req.get(name)
    res.locals.user = {}

    if (t) {
        try {
            const userInfo = token.verify(t)
            res.locals.user = userInfo || {}
        } catch (error) {
            res.locals.user = {}
        }
    }
    next()
}


// 检查请求该接口的用户角色，必须是先登录
exports.role = roleName => (req, res, next) => {
    const {
        role,
    } = res.locals.user
    if (role !== roleName) {
        res.status(403).json({
            success: false,
            message: '没有权限',
        })
        return
    }
    next()
}
// array or string
// path query
exports.query = field => (req, res, next) => {
    const hasParam = typeof field === 'string'
        ? !!req.query[field]
        : field.every(item => !!req.query[item])

    if (!hasParam) {
        const fields = typeof field === 'string' ? [field] : field
        res.json({
            success: false,
            message: `${fields.join('、')} 是必填字段`,
        })
        return
    }
    next()
}

// array or string
// body params
exports.formData = field => (req, res, next) => {
    const hasParam = typeof field === 'string'
        ? !!req.body[field]
        : field.every(item => !!req.body[item])

    if (!hasParam) {
        const fields = typeof field === 'string' ? [field] : field
        res.json({
            success: false,
            message: `${fields.join('、')} 是必填字段`,
        })
        return
    }
    next()
}
