const express = require('express')
const router = express.Router()
const tag = require('../controllers/tag')
const check = require('../middlewares/check')
const auth = require('../middlewares/auth')

router
  .get('/tags',
    tag.getTags
  )
  .post('/tag',
    check.bodyParams(['name']),
    auth('adminToken'),
    tag.postTag
  )
  .patch('/tag',
    check.bodyParams(['id','name']),
    auth('adminToken'),
    tag.patchTag
  )
  .delete('/tag/:id',
    check.params(['id']),
    auth('adminToken'),
    tag.deleteTag
  )

module.exports = router