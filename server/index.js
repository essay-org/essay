const { Nuxt, Builder } = require('nuxt')
// const bodyParser = require('body-parser')
const formidable = require('formidable')
const session = require('express-session')
const app = require('express')()
const axios = require('axios')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3010
// 服务端api地址
const axiosServer = axios.create({
  baseURL: 'http://127.0.0.1:8080/api'
})

app.set('port', port)
// app.use(bodyParser.json())

// Sessions 来创建 req.session
app.use(session({
  secret: 'vueblog-secret-key',
  name: 'token',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 * 10 }
}))

// 需要鉴权的路由
app.post('/api/login', function(req, res) {
  const loginForm = new formidable.IncomingForm()
  loginForm.parse(req, function(err, fields, files) {
    // 后台验证用户信息，并返回token
    async function login() {
      const { data } = await axiosServer.post('/login', fields)
      return data
    }

    login().then(function(data) {
      // 把token存储到session中,用户唯一id
      const { token } = data
      req.session.authUser = token
      // 原封不动返回
      return res.json(data)
    })
  })
})


app.post('/api/publish', function(req, res) {
  // 拿到token
  const token = req.session.authUser
  const publishForm = new formidable.IncomingForm()
  // 解析提交的数据，进行过滤操作
  publishForm.parse(req, function(err, fields, files) {
    if (token) {
      // 向后台提交数据,后台会验证token
      async function publish() {
        const { data } = await axiosServer.post('/article', fields, {
          headers: {
            token: token
          }
        })
        return data
      }

      publish().then(function(result) {
        return res.json(result)
      })
    } else {
      return res.json({ msg: '登录后操作' })
    }
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