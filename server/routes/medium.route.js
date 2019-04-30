const router = require('express').Router()
const medium = require('../controllers/medium.controller')
const check = require('../middlewares/check.middleware')


router
    .get('/mediums/:id',
        check.auth('token'),
        check.role('superAdmin'),
        medium.getMediums)
    .patch('/medium/:id',
        check.auth('token'),
        check.role('superAdmin'),
        medium.patchMedium)
    .delete('/medium/:filename',
        check.auth('token'),
        check.role('superAdmin'),
        medium.deleteMedium)
    .get('/medium-categories',
        medium.getMediumCategories)
    .get('/medium-category/:id',
        medium.getMediumCategory)
    .post('/medium-category',
        check.auth('token'),
        check.role('superAdmin'),
        medium.postMediumCategory)
    .patch('/medium-category/:id',
        check.auth('token'),
        check.role('superAdmin'),
        medium.patchMediumCategory)
    .delete('/medium-category/:id',
        check.auth('token'),
        check.role('superAdmin'),
        medium.deleteMediumCategory)

module.exports = router
