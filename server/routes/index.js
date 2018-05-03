import axios from 'axios'
import Router from 'koa-router'
import config from '../config'
import db from '../models'
import checkToken from '../middlewares/check-token'
import { getRssBodyFromBody } from '../rss'
import { getSitemapFromBody } from '../sitemap'
import getRobotsFromConfig from '../robots'

const router = new Router()
const user = require('../controllers/user')
const tag = require('../controllers/tag')
const article = require('../controllers/article')

// rss
let rss = ''
let baseUrl = `http://${config.app.host}:${config.app.port}`
if(process.env.NODE_ENV === 'production') {
  baseUrl = config.production.domain
}
let articleApi = `${baseUrl}/${config.app.routerBaseApi}/articles`
router.get('/rss.xml', async (ctx, next) => {
  await axios.get(articleApi).then((ret) => {
  let {data} = ret
  rss = getRssBodyFromBody(data, {
    title: 'VueBlog',
    siteUrl: baseUrl,
    description: 'VueBlog'
  })
})
  ctx.type = 'application/xml'
  ctx.res.end(rss)
})

// sitemap
let sitemap = ''
router.get('/sitemap.xml', async (ctx, next) => {
  await axios.get(articleApi).then((ret) => {
  const {data} = ret
  sitemap = getSitemapFromBody(data, {
    siteUrl: baseUrl
  })
})
  ctx.type = 'application/xml'
  ctx.res.end(sitemap)
})

// robots
let robots = ''
router.get('/robots.txt', (ctx, next) => {
  robots = getRobotsFromConfig({
    siteUrl: baseUrl
  })
  ctx.res.end(robots)
})

router
  .get('/api/user', user.getUserInfo)
  .patch('/api/user', checkToken, user.patchUserInfo)
  .post('/api/login', user.login)
  .post('/api/logout', checkToken, user.logout)

router
  .get('/api/tags/:id?', tag.getTagsOrArticles)
  .post('/api/tag', checkToken, tag.postTag)
  .patch('/api/tag', checkToken, tag.patchTag)
  .del('/api/tag/:id?', checkToken, tag.deleteTag)

router
  .get('/api/search/:keyword?', article.search)
  .get('/api/article/:id?', article.getArticle)
  .get('/api/articles/:page?/:limit?', article.getArticles)
  .get('/api/private-articles', checkToken, article.getPrivateArticles)
  .get('/api/archives', article.archives)
  .post('/api/article', checkToken, article.postArticle)
  .post('/api/upload', checkToken, article.upload)
  .patch('/api/article', checkToken, article.patchArticle)
  .del('/api/article/:id?', checkToken, article.deleteArticle)

export default router
