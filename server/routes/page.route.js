const router = require('express').Router()
const page = require('../controllers/page.controller')
const check = require('../middlewares/check.middleware')

router
    .get('/pages',
        page.getPages)
    .get('/page/:id',
        page.getPage)
    .post('/page',
        check.formData(['name', 'description']),
        check.auth('token'),
        check.role('superAdmin'),
        page.postPage)
    .patch('/page/:id',
        check.auth('token'),
        check.formData(['name', 'description']),
        check.role('superAdmin'),
        page.patchPage)
    .delete('/page/:id',
        check.auth('token'),
        check.role('superAdmin'),
        page.deletePage)

module.exports = router
