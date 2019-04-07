const express = require('express')
const article = require('../controllers/article')
const check = require('../middlewares/check')

const router = express.Router()

router
    .get('/articles',
        article.getArticles)
    .get('/article/:id',
        check.filter('token'),
        article.getArticle)
    .get('/drafts',
        check.auth('token'),
        check.role('superAdmin'),
        article.getDrafts)
    .post('/article',
        check.formData(['title', 'content']),
        check.auth('token'),
        check.role('superAdmin'),
        article.postArticle)
    .patch('/article/:id',
        check.formData(['title', 'content']),
        check.auth('token'),
        check.role('superAdmin'),
        article.patchArticle)
    .patch('/article-likes/:id',
        check.auth('token'),
        check.role('superAdmin'),
        article.patchArticleLikes)
    .delete('/article/:id',
        check.auth('token'),
        check.role('superAdmin'),
        article.deleteArticle)

module.exports = router
