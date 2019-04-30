
/* API server start */
require('./models')
const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const requireAll = require('require-all')
const cors = require('cors')
const rss = require('./controllers/tools/rss.controller')
const sitemap = require('./controllers/tools/sitemap.controller')
const robots = require('./controllers/tools/robots.controller')
const globalConfig = require('./config/global.config')

app.enable('trust proxy')

app.use(cors({ origin: globalConfig.app.domain, credentials: true }))
    .use(bodyParser.json({ limit: '50mb' }))
    .use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    .use(cookieParser())
    .use('/public', express.static(path.resolve(__dirname, '../public'), { maxAge: 1000 * 60 * 60 * 24 }))

const routes = requireAll({
    dirname: path.join(__dirname, './routes/'),
    filter: /(.+)\.route\.js$/,
})

for (const router of Object.values(routes)) {
    app.use('/api', router)
}

app.get('/robots.txt', robots)
    .get('/sitemap.xml', sitemap)
    .get('/rss.xml', rss)
/* API server end */

app.listen(3025, () => {
    console.log('server started at 127.0.0.1:3025')
})

module.exports = app
