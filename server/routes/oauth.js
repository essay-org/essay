const express = require('express')
const router = express.Router()
const oauth = require('../controllers/oauth')

router
  .get(/\/oauth\/github\/callback/,
    oauth.githubCallback
  )
  .get('/oauth/github/:state?',
    oauth.githubLogin
  )

module.exports = router