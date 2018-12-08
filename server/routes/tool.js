const express = require('express')
const router = express.Router()
const tool = require('../controllers/tool')

router
  .get('/rss.xml', tool.rss)
  .get('/sitemap.xml', tool.sitemap)
  .get('/robots.txt', tool.robots)

module.exports = router
