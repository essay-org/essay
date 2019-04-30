const router = require('express').Router()
const article = require('../controllers/article.controller')
const check = require('../middlewares/check.middleware')

router
    .get('/articles',
        article.getArticles)
    .get('/article/:id',
        check.filter('token'),
        article.getArticle)
    .get('/articles-top/:id?',
        article.getArticlesTop)
    .get('/drafts',
        check.auth('token'),
        check.role('superAdmin'),
        article.getDrafts)
    .post('/article',
        check.auth('token'),
        check.formData(['content']),
        check.role('superAdmin'),
        article.postArticle)
    .patch('/article/:id',
        check.auth('token'),
        check.formData(['content']),
        check.role('superAdmin'),
        article.patchArticle)
    .patch('/article-likes/:id',
        check.auth('token'),
        article.patchArticleLikes) // 任何人都可以点赞
    .delete('/article/:id',
        check.auth('token'),
        check.role('superAdmin'),
        article.deleteArticle)

module.exports = router
