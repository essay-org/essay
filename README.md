
<a href="https://travis-ci.org/wmui/essay"><img src="https://travis-ci.org/wmui/essay.svg?branch=master" alt="Build Status"></a>
<a href="https://github.com/wmui/vueblog"><img src="https://img.shields.io/badge/node-%3E%3D8.12.0-orange.svg" alt="Version"></a>
<a href="https://github.com/wmui/essay"><img src="https://img.shields.io/badge/license-AGPL-blue.svg" alt="License"></a>

## Essay

<p><a href="https://www.86886.wang" target="_blank">演示站</a></p>

Essay 原名 VueBlog，是一个基于 Nuxt2 开发的前后端同构应用，一个轻量级博客系统

### 功能特性

- 支持服务端渲染
- PWA渐进式web应用
- 轻量级Markdown编辑器
- 支持标签、文章搜索、评论、邮件通知和草稿箱等功能


### 更新说明

v1.0.0-v1.2.1： 基于express服务端渲染，原生Vue SSR

v2.0.0-v2.3.1：基于koa服务端渲染，采用Nuxt1.x框架开发

v3.0.0：基于express服务端渲染，采用Nuxt2.x框架开发（由于生态问题，放弃koa）

### 本地运行

#### 启动数据库

首先安装[MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)数据库和[Node.js](https://nodejs.org/en/)环境，然后启动数据库

```bash
# yourDBpath 表示你自定义的数据库目录，任意位置皆可
$ sudo mongod --dbpath yourDBpath
```

#### 运行项目

```bash
$ git clone https://github.com/wmui/essay

$ cd essay

$ yarn # 或 npm install

$ npm run dev # 访问 http://127.0.0.1:3000
```

### 配置说明

配置文件在`server/config`目录下

管理员默认用户名：q，默认密码：q

```js
module.exports = {
  // 初始化管理员信息
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    nickname: 'Essay',
    email: 'qq22337383@gmail.com',
    motto: 'Never too old to learn',
  },
  // jwt 配置
  jwt: {
    secret: 'essay',
    expiresIn: 1296000,
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'essay-dev',
    port: 27017,
    username: '',
    password: '',
  },
  // GitHub登录
  githubConfig: {
    githubClient: '',
    githubSecret: '',
    scope: 'user',
  },
  // SMTP配置
  emailConfig: {
    user: '',
    pass: '',
  },
}
```

### 线上部署

如果需要部署到线上，可以参考这里[Node项目自动化部署](https://github.com/wmui/web-deploy)

如果感觉自动化部署太麻烦，可以简单部署

```bash
$ git clone https://github.com/wmui/essay

$ cd essay

$ yarn

$ npm run dev

pm2 start npm --name "essay" -- start # pm2 启动
```

### 接口文档

baseUrl: http://127.0.0.1:3000/v1

若无特殊说明，所有POST、PATCH、DELETE请求均需要认证信息

#### 文章

| Method | URL | 参数 | 描述 |
| --- | --- | --- | --- |
| GET | /articles/{limit}/{page} | limit: 显示多少条，page: 第几页 | 获取首页展示的文章列表|
| GET | /article/{id} | 文章id | 获取文章详情 |
| GET | /stick/{limit}/{page} | ... | 获取置顶文章 |
| GET | /drafts/{limit}/{page} | ... | 获取草稿文章，需要token |
| GET | /search/{keyword}/{limit}/{page} | keyword: 搜索关键字 | 获取搜索列表 |
| GET | /tag/{id}/{limit}/{page} | id: 标签id | 获取标签下的文章列表 |
| POST | /article | title: 标题，content: 内容，tags：标签id组成的数组（可选） | 发布文章 |
| PATCH | /article | id: 文章的id，title: 标题，content: 内容| 修改文章 |
| DELETE | /article/{id} | id: 文章的id | 删除文章 |

#### 标签

| Method | URL | 参数 | 描述 |
| --- | --- | --- | --- |
| GET | /tags | | 获取所有标签 |
| POST | /tag | name: 标签名 | 创建一个标签 | 
| PATCH | /tag | id: 原标签id，name： 新标签名字 | 修改标签 |
| DELETE | /tag/{id} | id: 标签id | 删除一个标签 |

#### 用户

| Method | URL | 参数 | 描述 |
| --- | --- | --- | --- |
| GET | /admin | | 获取管理员信息 |
| GET | /user | | 获取用户信息，需要token |
| POST | /login | username: 用户名，password: 密码 | 管理员登录，后端会返回token并设置cookie | 
| POST | /logout | | 退出登录 |
| PATCH  | /password | oldPassword: 旧密码，newPassword: 新密码| 修改管理员密码 |
| PATCH | /admin | nickname： 昵称，emial： 邮箱，motto： 介绍| 修改管理员信息 | 

#### 评论

| Method | URL | 参数 | 描述 |
| --- | --- | --- | --- |
| GET | /comments | | 获取所有的评论 |
| POST | /comment | id: 文章id，content: 评论内容 | 用户发布评论 |
| DELETE | /comment/{id} | id: 评论的id | 管理员删除评论 |

#### OAuth认证

仅支持GitHub

| Method | URL | 参数 | 描述 |
| --- | --- | --- | --- |
| GET | /oauth/github/{state} | state: 文章id | GitHub授权 |

#### 基础服务

| Method | URL | 参数 | 描述 |
| --- | --- | --- | --- |
| POST | /upload-img | | 上传图片 |

#### 服务

| Method | URL | 参数 | 描述 |
| --- | --- | --- | --- |
| GET | /rss.xml | | rss订阅服务 | 
| GET | /sitemap.xml | | 网站地图，便于搜索引擎收录 | 
| GET | /robots.txt | | robot 协议 | 

**PS：** 经个人实践，Nuxt并不像想象的那么好用，在大型项目上应用Nuxt还需斟酌，个人意见，仅供参考

### 开源协议

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)  
