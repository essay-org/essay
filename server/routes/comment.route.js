const router = require('express').Router()
const comment = require('../controllers/comment.controller')
const check = require('../middlewares/check.middleware')

router
    .get('/comments',
        check.auth('token'),
        comment.getComments)
    .get('/comments/:id',
        comment.getComments)
    .post('/comment',
        check.auth('token'),
        check.formData(['id', 'content']),
        comment.postComment)
    .delete('/comment/:id',
        check.auth('token'),
        check.role('superAdmin'),
        comment.deleteComment)

module.exports = router
