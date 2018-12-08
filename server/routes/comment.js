const express = require('express')
const router = express.Router()
const comment = require('../controllers/comment')
const check = require('../middlewares/check')
const auth = require('../middlewares/auth')

router
  .post('/comment',
    check.bodyParams(['id', 'content']),
    auth('localToken'),
    comment.postComment
  )
  .get('/comments',
    comment.getComments
  )
  .delete('/comment/:id',
    check.params(['id']),
    auth('adminToken'),
    comment.deleteComment
  ) // 管理员可以删除评论

module.exports = router