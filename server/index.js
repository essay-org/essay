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
const staticServer = express.static(path.resolve(__dirname, '../public'), { maxAge: 1000 * 60 * 60 * 24 })
const globalConfig = require('./config/global.config')
const handle = require('./middlewares/handle.middleware')
const validate = require('./middlewares/validate.middleware')
const domain = require('./middlewares/domain.middleware')
const router = require('./router')

app.enable('trust proxy')
app.use(cors({ origin: globalConfig.app.domain, credentials: true }))
  .use(domain)
  .use(bodyParser.json({ limit: '50mb' }))
  .use(cookieParser())
  .use('/public', staticServer)
  .use(handle)
  .use(validate)
  .use(router)

/* API server end */

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(3025, () => {
    console.log(`server started at ${globalConfig.app.domain}`)
  })
}
start()
