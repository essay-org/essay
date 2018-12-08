const express = require('express')
const router = express.Router()
const article = require('../controllers/article')
const check = require('../middlewares/check')
const auth = require('../middlewares/auth')
const flag = require('../middlewares/flag')

router
  .get('/article/:id',
    check.params(['id']),
    article.getArticle
  )
  .get('/search/:keyword/:limit?/:page?',
    article.getArticles
  )
  .get('/articles/:limit?/:page?', 
    flag('index'),
    article.getArticles
  )
  .get('/stick/:limit?/:page?',
    flag('stick'),
    article.getArticles
  )
  .get('/tag/:id/:limit?/:page?', 
    flag('tag'), 
    article.getArticles
  )
  .get('/drafts/:limit?/:page?', 
    flag('draft'),
    auth('adminToken'),
    article.getArticles
  )
  .post('/article',
    check.bodyParams(['title', 'content']),
    auth('adminToken'), 
    article.postArticle
  )
  .patch('/article',
    check.bodyParams(['id', 'title', 'content']),
    auth('adminToken'),
    article.patchArticle
  )
  .delete('/article/:id',
    check.params(['id']),
    auth('adminToken'),
    article.deleteArticle
  )

module.exports = router