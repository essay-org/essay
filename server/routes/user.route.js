const router = require('express').Router()
const user = require('../controllers/user.controller')
const check = require('../middlewares/check.middleware')

router
    .get('/users',
        check.auth('token'),
        user.getUsers)
    .get('/user',
        check.auth('token'),
        user.getUserInfo)
    .get('/user-base/:id',
        user.getUserInfo)
    .post('/user',
        check.formData(['username', 'email', 'password']),
        user.postUser) // 注册
    .patch('/user',
        check.auth('token'),
        user.patchUserInfo)
    .patch('/user/password',
        check.formData(['oldPassword', 'newPassword']),
        check.auth('token'),
        user.patchPassword)
    .post('/login',
        check.formData(['email', 'password', 'code']),
        user.login)
    .post('/logout',
        check.auth('token'),
        user.logout)

module.exports = router
