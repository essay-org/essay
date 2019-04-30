const router = require('express').Router()
const check = require('../middlewares/check.middleware')
const system = require('../controllers/tools/system.controller')
const email = require('../controllers/tools/email.controller')
const upload = require('../controllers/tools/upload.controller')
const github = require('../controllers/tools/github.controller')
const backup = require('../controllers/tools/backup.controller')
const captcha = require('../controllers/tools/captcha.controller')

router
    .get('/system',
        check.auth('token'),
        check.role('superAdmin'),
        system.system)
    .get('/system-config',
        system.globalConfig)
    .post('/upload-img',
        check.auth('token'),
        check.role('superAdmin'),
        upload.img)
    .post('/upload-file',
        check.auth('token'),
        check.role('superAdmin'),
        upload.file)
    .get('/backup',
        check.auth('token'),
        check.role('superAdmin'),
        backup.backup)
    .get('/code', captcha.code)
    .post('/email',
        check.auth('token'),
        email.postEmail) // 用户评论后默认是登录状态
    .get(/\/api\/oauth\/github\/callback/,
        github.githubCallback)
    .get('/oauth/github/:state?',
        github.githubLogin)


module.exports = router
