[English Doc](https://github.com/wmui/vueblog/blob/master/README.en.md)

<a href="https://travis-ci.org/wmui/vueblog"><img src="https://travis-ci.org/wmui/vueblog.svg?branch=master" alt="Build Status"></a>
<a href="https://github.com/wmui/vueblog"><img src="https://img.shields.io/badge/license-AGPL-blue.svg" alt="License"></a>

<div style="text-align:center">
  <img src="https://www.86886.wang/public/1525424904553.png" alt="VueBlog">
  <p><a href="https://www.86886.wang" target="_blank">演示站</a></p>
</div>

## VueBlog

VueBlog是一个小而美的博客应用

### 技术栈

- 前端：Nuxt.js + Vuex
- 后端: Mongoose + Koa

### 功能特性

- 服务端渲染
- PWA渐进式web应用
- 基于Vue开发的轻量级Markdown编辑器

### 本地运行

本地安装[MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)数据库和[Node.js](https://nodejs.org/en/)环境。

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:3000
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

### 全局配置

全局配置文件`/server/config/index.js`

默认用户名：q，默认密码：q  

```javascript
export default {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    email: 'qq22337383@gmail.com',
    nickname: 'VueBlog',
    motto: 'Never too old to learn',
    avatar: 'avatar.png'
  },
  jwt: {
    secret: 'vueblog'
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'vueblog',
    port: 27017,
    username: '',
    password: ''
  },
  production: {
    host: '198.13.32.165',
    domain: 'https://www.86886.wang'
  },
  app: {
    host: '127.0.0.1',
    port: 3000,
    routerBaseApi: 'api'
  }
}

```

### 开源协议

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)  
