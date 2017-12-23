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

/*
 * 以下是有数据提交的请求
*/

// 登录
app.post('/v1/login', function (req, res, next) {
  let username = req.body.username
  let password = req.body.password
  password = md5(password)

  // 根据用户名查询数据库
  db.find('users', { user: username }, function (err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 500,
        message: '内部服务器错误'
      })
    }

    if (result.length === 0) {
      return res.json({
        code: 401,
        message: '找不到用户名'
      })
    }

    // console.log(result)
    let id = result[0]._id

    if (result[0].user === username && result[0].pass === password) {
      // token包含了用户的名字和唯一id
      const serverToken = jwt.sign({ username: username, userID: id }, 'vueblog')
      // 把token存储到cookie中
      res.cookie('token', serverToken, { maxAge: 60000 * 60 * 24 * 30 })
      return res.json({
        code: 200,
        message: '登录成功',
        token: serverToken
      })
    } else {
      return res.json({
        code: 401,
        message: '密码错误'
      })
    }
  })
})

// 登出
app.post('/v1/logout', function (req, res) {
  res.clearCookie('token')
  res.json({
    code: 200,
    msg: '退出登录'
  })
})

// 发布文章，发布草稿，编辑文章
app.post('/v1/article', hasToken, function (req, res, next) {
  let title = req.body.title
  let content = req.body.content
  let tag = req.body.tag
  let date = req.body.date
  let state = req.body.state
  let newData = {
    title: title,
    content: content,
    tag: tag,
    state: state,
    date: date
  }

  db.find('infos', { 'query': { 'date': date } }, function (err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 500,
        message: '内部服务器错误'
      })
    }
    // 能通过发布日期找到文章，说明你编辑了文章
    if (result.length === 1) {
      db.updateMany('infos', { 'date': date }, newData, function (err, result2) {
        if (err) {
          console.log(err)
          return res.json({
            code: 401,
            message: '文章更新失败'
          })
        }

        return res.json({
          code: 200,
          message: '文章更新成功'
        })
      })
    } else {
      // 插入到数据库
      db.insertOne('infos', newData, function (err, result3) {
        if (err) {
          console.log(err)
          return res.json({
            code: 401,
            message: '文章发布失败'
          })
        }

        if (state === 'draft') {
          return res.json({
            code: 200,
            message: '草稿保存草稿'
          })
        }
        return res.json({
          code: 200,
          message: '文章发布成功'
        })
      })
    }
  })
})

// 更新管理员信息
app.put('/v1/administrator', hasToken, function (req, res, next) {
  const clientToken = req.headers.token
  const decoded = jwt.verify(clientToken, 'vueblog')
  const username = decoded.username
  db.updateMany('users', { user: username }, req.body, function (err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 401,
        message: '信息修改失败'
      })
    }

    return res.json({
      code: 200,
      message: '信息修改成功'
    })
  })
})

// 修改密码
app.put('/v1/password', hasToken, function (req, res, next) {
  const clientToken = req.headers.token
  const decoded = jwt.verify(clientToken, 'vueblog')
  const username = decoded.username

  let oldPass = md5(req.body.oldPass)
  let newPass = md5(req.body.newPass)
  db.find('users', {}, function (err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 500,
        message: '内部服务器错误'
      })
    }
    if (oldPass !== result[0].pass) {
      return res.json({
        code: 403,
        message: '旧密码输入有误'
      })
    }

    db.updateMany('users', { 'user': username }, { 'pass': newPass }, function (err, result2) {
      if (err) {
        console.log(err)
        return res.json({
          code: 401,
          message: '密码修改失败'
        })
      }
      return res.json({
        code: 200,
        message: '密码修改成功'
      })
    })
  })
})

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
