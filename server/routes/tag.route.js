const router = require('express').Router()
const tag = require('../controllers/tag.controller')
const check = require('../middlewares/check.middleware')

router
    .get('/tags',
        tag.getTags)
    .post('/tag',
        check.auth('token'),
        check.role('superAdmin'),
        tag.postTag)
    .patch('/tag',
        check.formData(['id', 'name']),
        check.auth('token'),
        check.role('superAdmin'),
        tag.patchTag)
    .delete('/tag/:id',
        check.auth('token'),
        check.role('superAdmin'),
        tag.deleteTag)

module.exports = router
