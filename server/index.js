const {
    Nuxt,
    Builder,
} = require('nuxt')

/* API server start */
require('./models')
const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const configApp = require('./config')

// app.enable('trust proxy')
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use((req, res, next) => {
    let cookieDomain = ''
    const isLoal = /127.0.0.1/.test(configApp.app.domain)
    if (isLoal) {
        cookieDomain = '127.0.0.1'
    } else {
        // 域名 domain: https://www.86886.wang  cookieDomain: .86886.wang
        const arr = configApp.app.domain.split('.')
        cookieDomain = `${arr[arr.length - 2]}.${arr[arr.length - 1]}`
    }
    res.locals.user = {}
    res.locals.cookieDomain = cookieDomain
    res.locals.domain = configApp.app.domain
    next()
})

app.use('/public', express.static(path.resolve(__dirname, './public'), { maxAge: 1000 * 60 * 60 * 24 }))
app.use(require('./routes'))
/* API server end */

const config = require('../nuxt.config.js')

config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
    const nuxt = new Nuxt(config)

    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }

    app.use(nuxt.render)

    app.listen(3025, () => {
        console.log('server started at 127.0.0.1:3025')
    })
}
start()
