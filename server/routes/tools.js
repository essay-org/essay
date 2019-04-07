const express = require('express')
const check = require('../middlewares/check')
const system = require('../controllers/tools/system')
const email = require('../controllers/tools/email')
const upload = require('../controllers/tools/upload')
const github = require('../controllers/tools/github')
const robots = require('../controllers/tools/robots')
const rss = require('../controllers/tools/rss')
const sitemap = require('../controllers/tools/sitemap')

const router = express.Router()


router
    .get('/api/system',
        check.auth('token'),
        check.role('superAdmin'),
        system)
    .post('/api/upload-img',
        check.auth('token'),
        check.role('superAdmin'),
        upload.img)
    .post('/api/email',
        check.auth('token'),
        email.postEmail) // 用户评论后默认是登录状态
    .get(/\/api\/oauth\/github\/callback/,
        github.githubCallback)
    .get('/api/oauth/github/:state?',
        github.githubLogin)
    .get('/robots.txt', robots)
    .get('/sitemap.xml', sitemap)
    .get('/rss.xml', rss)
module.exports = router
