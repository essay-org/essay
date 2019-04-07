/* API server start */
require('./models')
const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const configApp = require('./config')

app.enable('trust proxy')
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(bodyParser.json())
app.use(cookieParser())
// eg: domain: https://www.86886.wang  cookieDomain: .86886.wang
app.use((req, res, next) => {
    let cookieDomain = ''
    if (process.env.NODE_ENV === 'production') {
        const arr = configApp.app.domain.split('.')
        cookieDomain = `${arr[arr.length - 2]}.${arr[arr.length - 1]}`
    } else {
        cookieDomain = '127.0.0.1'
    }
    res.locals.user = {}
    res.locals.cookieDomain = cookieDomain
    res.locals.domain = configApp.app.domain
    next()
})

app.use('/public', express.static(path.resolve(__dirname, './public'), { maxAge: 1000 * 60 * 60 * 24 }))
app.use(require('./routes'))
/* API server end */

app.listen(3025, () => {
    console.log('server started at 127.0.0.1:3025')
})

module.exports = app
