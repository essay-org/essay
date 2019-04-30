const router = require('express').Router()
const category = require('../controllers/category.controller')
const check = require('../middlewares/check.middleware')

router
    .get('/categories',
        check.filter('token'),
        category.getCategories)
    .get('/category/:id',
        category.getCategory)
    .post('/category',
        check.formData(['name']),
        check.auth('token'),
        check.role('superAdmin'),
        category.postCategory)
    .patch('/category/:id',
        check.formData(['name']),
        check.auth('token'),
        check.role('superAdmin'),
        category.patchCategory)
    .delete('/category/:id',
        check.auth('token'),
        check.role('superAdmin'),
        category.deleteCategory)

module.exports = router
