const router = require('express').Router()
const check = require('./middlewares/check.middleware')
const user = require('./controllers/user.controller')
const category = require('./controllers/category.controller')
const comment = require('./controllers/comment.controller')
const article = require('./controllers/article.controller')
const option = require('./controllers/option.controller')

// tools
const email = require('./controllers/tools/email.controller')
const upload = require('./controllers/tools/upload.controller')
const backup = require('./controllers/tools/backup.controller')
const captcha = require('./controllers/tools/captcha.controller')
const rss = require('./controllers/tools/rss.controller')
const sitemap = require('./controllers/tools/sitemap.controller')
const robots = require('./controllers/tools/robots.controller')

router
  .get('/api/admin',
    user.getAdmin)
  .post('/api/login',
    user.login)
  .post('/api/logout',
    check.auth('token'),
    user.logout)
  .patch('/api/password',
    check.auth('token'),
    user.patchPassword)
  .patch('/api/admin',
    check.auth('token'),
    user.patchAdmin)

router
  .get('/api/categories',
    check.filter('token'),
    category.getCategories)
  .get('/api/category/:id',
    category.getCategory)
  .post('/api/category',
    check.auth('token'),
    category.postCategory)
  .patch('/api/category/:id',
    check.auth('token'),
    category.patchCategory)
  .delete('/api/category/:id',
    check.auth('token'),
    category.deleteCategory)

router
  .get('/api/comments',
    check.auth('token'), // 管理员才能获取所有评论
    comment.getComments)
  .get('/api/comments/:id',
    comment.getComments) // 根据文章id获取评论
  .post('/api/comment',
    comment.postComment)
  .post('/api/comment-reply',
    check.auth('token'),
    comment.postCommentReply)
  .delete('/api/comment/:id',
    check.auth('token'),
    comment.deleteComment)

router
  .get('/api/articles',
    check.filter('token'),
    article.getArticles)
  .get('/api/article/:id',
    check.filter('token'),
    article.getArticle)
  .get('/api/articles-top',
    check.filter('token'),
    article.getArticlesTop)
  .get('/api/articles-new',
    check.filter('token'),
    article.getArticlesNew)
  .get('/api/drafts',
    check.auth('token'),
    article.getDrafts)
  .post('/api/article',
    check.auth('token'),
    article.postArticle)
  .patch('/api/article/:id',
    check.auth('token'),
    article.patchArticle)
  .delete('/api/article/:id',
    check.auth('token'),
    article.deleteArticle)

router
  .post('/api/upload',
    check.auth('token'),
    upload.file)
  .get('/api/backup',
    check.auth('token'),
    backup.backup)
  .get('/api/code',
    captcha.code)
  .post('/api/email',
    email.postEmail) // 用户评论后默认是登录状态

router
  .patch('/api/option',
    check.auth('token'),
    option.patchOption)
  .get('/api/option-email',
    check.auth('token'),
    option.getOptionEmail) // email 为保密信息
  .get('/api/option-seo',
    option.getOptionSeo)


// 没有API前缀
router
  .get('/robots.txt', robots)
  .get('/sitemap.xml', sitemap)
  .get('/rss.xml', rss)

module.exports = router
