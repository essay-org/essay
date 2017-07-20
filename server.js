const { JSDOM } = require('jsdom')
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost:8080' })
global.window = dom.window
global.document = window.document
global.navigator = window.navigator
const cookieParser = require('cookie-parser')

const router = require('./server/router.js')
const cors = require('cors')

const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')


const isProd = process.env.NODE_ENV === 'production'
const useMicroCache = process.env.MICRO_CACHE !== 'false'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()
app.use(cookieParser());
const template = fs.readFileSync(resolve('./src/index.template.html'), 'utf-8')


function createRenderer(bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    template,
    // 组件缓存
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // 仅在vue-server-renderer是npm-linked时才需要
    basedir: resolve('./dist'),
    // 性能优化，推荐设置
    runInNewContext: false
  }))
}

let renderer
let readyPromise
if (isProd) {
  //在生产中：使用内置的服务器包创建服务器渲染器。
     //服务器包由vue-ssr-webpack-plugin生成。
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  //客户端清单是可选的，但它允许渲染器自动推断 preload/prefetch 链接，并直接
  //添加<script>标签在渲染过程中使用的任何异步块，避免瀑布请求。
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    clientManifest
  })
} else {
  //在开发中：使用watch和hot-reload设置dev服务器，
     //并在bundle / index模板更新上创建一个新的渲染器。
  readyPromise = require('./build/setup-dev-server')(app, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(cors()); //允许跨域
app.use(compression({ threshold: 0 }));
app.use(favicon('./public/logo-48.png'));
app.use('/dist', serve('./dist', true));
app.use('/public', serve('./public', true));
app.use('/manifest.json', serve('./manifest.json', true));
app.use('/service-worker.js', serve('./dist/service-worker.js'));

// 微缓存
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
const microCache = LRU({
  max: 100,
  maxAge: 1000
})

//因为这个应用程序没有用户特定的内容，每个页面都是可以缓存的。
//如果您的应用涉及用户特定内容，则需要实现自定义逻辑，以确定
//请求是否可缓存基于其URL和标题
const isCacheable = req => useMicroCache

function render(req, res) {
  const s = Date.now()
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)
  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      // 渲染错误页面或重定向
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const cacheable = isCacheable(req)
  if (cacheable) {
    const hit = microCache.get(req.url)
    if (hit) {
      if (!isProd) {
        console.log(`cache hit!`)
      }
      return res.end(hit)
    }
  }

  const context = {
    title: 'vueblog', // 默认标题
    url: req.url,
    cookies: req.cookies
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.end(html)
    if (cacheable) {
      microCache.set(req.url, html)
    }
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}
// 前端路由拦截
app.get('/login', function(req, res, next) {
  if (req.cookies.token) {
    res.redirect('/index')
  } else {
    next()
  }
})

// 服务端路由拦截
app.get(['/admin', '/admin/*', '/adminpublish', '/adminpublish/*', '/adminedit', '/updateinfo'], function(req, res, next) {
  if (req.cookies.token) {
    next()
  } else {
    res.redirect('/login')
  }
})

// 获取某用户的文章 http://localhost:8080/api/people
app.get('/api/people', router.people);

// 获取用户信息 http://localhost:8080/api/userinfo
app.get('/api/userinfo', router.userinfo);

// 获取文章详情 http://localhost:8080/api/article?id=1496841740682
app.get('/api/article', router.article);

// 获取标签 
app.get('/api/tag', router.tag);

// 按照标签查询 http://localhost:8080/api/bytag?tag=js
app.get('/api/bytag', router.bytag);

// 模糊搜索 http://localhost:8080/api/search?info=js
app.get('/api/search', router.search);

// 归档统计 
app.get('/api/archive', router.archive);

// 通过归档日期获取文章 http://localhost:8080/api/archive?date=201706
app.get('/api/byarchive', router.byarchive);

// 后台管理数据
app.get('/api/allarticle', router.allarticle);

// 删除文章  http://localhost:8080/api/delete?id=1496841740682
app.post('/api/delete', router.delete);

// 发表文章
app.post('/api/publish', router.publish);

// 用户登录
app.post('/api/login', router.login);

// 更新管理员信息
app.post('/api/updateadmin', router.updateadmin);

// 修改头像
app.post('/api/setavatar', router.setavatar);

app.post('/api/updateinfo', router.updateinfo);

// 退出登录
app.post('/api/logout', router.logout);
app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})
const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})