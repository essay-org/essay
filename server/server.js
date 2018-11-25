import path from 'path'
import Koa from 'koa'
import axios from 'axios'
import KoaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import KoaLogger from 'koa-logger'
import Router from 'koa-router'
import cors from '@koa/cors'
import globalConfig from './config'
import route from './routes'

const app = new Koa()

const host = process.env.HOST || globalConfig.app.host
const port = process.env.PORT || globalConfig.app.port
const router = new Router()
app.use(cors())
app.use(bodyParser())
app.use(KoaStatic(path.join( __dirname,  './../public')))
app.use(KoaLogger())
router.use('', route.routes())
app
.use(router.routes())
.use(router.allowedMethods())

app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
