
<a href="https://travis-ci.org/wmui/essays"><img src="https://travis-ci.org/wmui/essays.svg?branch=master" alt="Build Status"></a>
<a href="https://github.com/wmui/essays"><img src="https://img.shields.io/badge/license-AGPL-blue.svg" alt="License"></a>

## Essays

[English Doc](https://github.com/wmui/essays/blob/master/README.en.md)

<div style="text-align:center;">
  <p><a href="https://www.86886.wang" target="_blank">演示站</a></p>
</div>

Eaasys 是一个轻量级的博客应用

### 技术栈

- 前端：Nuxt.js + Vuex
- 后端: Mongoose + Koa

### 功能特性

- 支持服务端渲染
- PWA渐进式web应用
- 轻量级Markdown编辑器
- 支持标签、归档、搜索和草稿箱等功能

### 本地运行

安装[MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)数据库和[Node.js](https://nodejs.org/en/)环境。

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at http://127.0.0.1:3000
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

**注意：** 不要使用`http://localhost:3000`访问，而是用`http://127.0.0.1:3000`

### 全局配置

全局配置文件`/server/config/index.js`

默认用户名：q，默认密码：q  

```javascript
export default {
  // 初始化管理员信息，后台可以修改
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    email: 'qq22337383@gmail.com',
    nickname: 'Essays',
    motto: 'Never too old to learn'
  },
  jwt: {
    secret: 'vueblog'
  },
  // 数据库配置，默认即可
  mongodb: {
    host: '127.0.0.1',
    database: 'vueblog',
    port: 27017,
    username: '',
    password: ''
  },
  // 可选，评论功能需要配置github登录的密钥
  githubConfig: {
    githubClient: '',
    githubSecret: '',
    scope: 'user'
  },
  // 可选，评论通知的SMTP邮箱配置，目前只支持qq邮箱
  emailConfig: {
    user: '',
    pass: ''
  },
  app: {
    domain: '', // 可选，线上域名，比如https://www.86886.wang
    host: '127.0.0.1',
    port: 3000,
    routerBaseApi: 'api'
  }
}
```

### 线上部署

如果需要部署到线上看下效果，可以参考这里[Nuxt项目自动化部署](https://github.com/wmui/web-deploy)

如果感觉自动化部署太麻烦，可以简单部署上线

```bash
# install dependencies
npm install # or yarn

# build for production
npm run build

# serve in production mode
pm2 start npm --name "essays" -- start
```

该项目仅供学习交流，不建议用于线上

### 开源协议

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)  
