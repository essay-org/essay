const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const path = require('path')
const router = require('./model/router.js')
const hasToken = require('./model/has-token.js')
const md5 = require('./model/md5.js')
const db = require('./model/db.js')
const resolve = file => path.resolve(__dirname, file)
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)
app.use(bodyParser.json())
app.use(cookieParser())
// 允许跨域
app.use(cors())
// 静态public
app.use('/public', express.static(resolve('../public')))

// 获取已发布文章列表
app.get('/v1/posts', router.posts)

// 获取管理员信息
app.get('/v1/administrator', router.admin)

// 获取文章详情 eg:http://localhost:8080/v1/article?id=1496841740682
app.get('/v1/article', router.getArticle)

// 获取标签列表
app.get('/v1/tags', router.tags)

// 获取某个标签下的文章列表  eg: http://localhost:8080/v1/tag?tag=javascript
app.get('/v1/tag', router.tag)

// 搜索(目前仅支持按标题搜索) eg:http://localhost:8080/v1/search?q=j
app.get('/v1/search', router.search)

// 获取归档列表
app.get('/v1/archives', router.archives)

// 获取某个归档下的文章列表 eg:http://localhost:8080/v1/archive?date=201706
app.get('/v1/archive', router.archive)

// 获取所有文章(包括草稿)
app.get('/v1/articles', hasToken, router.articles)

// 更新管理员头像
app.post('/v1/avatar', hasToken, router.avatar)

// 发布文章时，文章中的图片上传接口
app.post('/v1/upload', hasToken, router.upload)

// 删除文章 eg: http://localhost:8080/v1/article?id=1496841740682
app.delete('/v1/article', hasToken, router.deleteArticle)

// 发布文章，发布草稿，编辑文章
app.post('/v1/article', hasToken, router.postArticle)

// 更新管理员信息
app.put('/v1/administrator', hasToken, router.putAdmin)

// 修改密码
app.put('/v1/password', hasToken, router.putPassword)

// 登录
app.post('/v1/login', router.login)

// 登出
app.post('/v1/logout', router.logout)


// api地址错误处理
app.get('/v1/*', router.noData)
app.post('/v1/*', router.noData)
app.put('/v1/*', router.noData)
app.delete('/v1/*', router.noData)

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
