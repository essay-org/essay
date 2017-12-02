const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = require('express')()
const axios = require('axios')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3010
// 服务端api地址
const axiosServer = axios.create({
  baseURL: 'http://127.0.0.1:8080/v1'
})

app.set('port', port)
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/api/login', function (req, res) {
  // 后台验证用户信息，并返回token
  async function login () {
    const { data } = await axiosServer.post('/login', req.body)
    return data
  }

  login().then(function (data) {
    // 把token存储到cookie中
    const { token } = data
    if (token) {
      res.cookie('token', token, {
        maxAge: 60000 * 60 * 24
      })
    }
    // 原封不动返回
    return res.json(data)
  })
})
app.post('/api/logout', function (req, res) {
  res.clearCookie('token')
  res.json({
    code: 200,
    msg: '退出登录'
  })
})
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console