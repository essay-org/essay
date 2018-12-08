const express = require('express')
const router = express.Router()
const check = require('../middlewares/check')
const auth = require('../middlewares/auth')
const user = require('../controllers/user')

router
  .get('/user',
    auth('localToken'),
    user.getUserInfo
  ) // 获取用户信息
  .get('/admin',
    user.getAdminInfo
  )
  .patch('/admin',
    auth('adminToken'),
    user.patchAdminInfo,
  )
  .patch('/password',
    check.bodyParams(['oldPassword', 'newPassword']),
    auth('adminToken'),
    user.patchAdminPassword,
  )
  .post('/login',
    check.bodyParams(['username', 'password']),
    user.login,
  )
  .post('/logout',
    auth('adminToken'),
    user.logout,
  )

module.exports = router