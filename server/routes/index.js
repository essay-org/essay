const express = require('express')

const router = express.Router()

router.use('/api', require('./article'))
router.use('/api', require('./category'))
router.use('/api', require('./comment'))
router.use('/api', require('./page'))
router.use('/api', require('./tag'))
router.use('/api', require('./user'))
router.use(require('./tools')) // 部分api不需要prefix


module.exports = router
