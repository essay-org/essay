const express = require('express')
const category = require('../controllers/category')
const check = require('../middlewares/check')

const router = express.Router()

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
