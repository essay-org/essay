
/* API server start */
require('./models')
const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const staticServer = express.static(path.resolve(__dirname, '../public'), { maxAge: 1000 * 60 * 60 * 24 })
const globalConfig = require('./config/global.config')
const handle = require('./middlewares/handle.middleware')
const validate = require('./middlewares/validate.middleware')
const router = require('./router')


app.enable('trust proxy')
app.use(cors({ origin: globalConfig.app.domain, credentials: true }))
    .use(bodyParser.json({ limit: '50mb' }))
    .use(handle)
    .use(validate)
    .use(cookieParser())
    .use('/public', staticServer)
    .use(router)

/* API server end */

app.listen(3025, () => {
    console.log(`server started at ${globalConfig.app.domain}`)
})

module.exports = app
