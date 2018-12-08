const express = require('express')
const router = express.Router()
const email = require('../utils/email')
const upload = require('../utils/upload')
const auth = require('../middlewares/auth')

router
  .post('/send-email', email)
  .post('/upload-img', auth('adminToken'), upload.img)

module.exports = router
