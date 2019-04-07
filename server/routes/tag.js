const express = require('express')
const tag = require('../controllers/tag')
const check = require('../middlewares/check')

const router = express.Router()

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
