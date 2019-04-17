const express = require('express')
const comment = require('../controllers/comment')
const check = require('../middlewares/check')

const router = express.Router()

router
    .get('/comments',
        check.auth('token'),
        comment.getComments)
    .get('/comments/:id',
        comment.getComments)
    .post('/comment',
        check.formData(['id', 'content']),
        check.auth('token'),
        comment.postComment)
    .delete('/comment/:id',
        check.auth('token'),
        check.role('superAdmin'),
        comment.deleteComment)

module.exports = router
