<p align="center">
<img src="https://www.86886.wang/public/picture/1554636859240.png">
</p>

<p align="center">
<a href="https://travis-ci.org/wmui/essay"><img src="https://travis-ci.org/wmui/essay.svg?branch=master" alt="Build Status"></a>
<a href="https://github.com/wmui/vueblog"><img src="https://img.shields.io/badge/node-%3E%3D8.12.0-orange.svg" alt="Version"></a>
<a href="https://github.com/wmui/essay"><img src="https://img.shields.io/badge/license-AGPL-blue.svg" alt="License"></a>
</p>

<p align="center"><a href="https://www.86886.wang" target="_blank">演示站</a></p>

> Essay - 简约而不简单的博客系统

<a href="https://www.86886.wang/posts/5ca9d0b2277e7f71cc4e2caa" target="_blank">快速了解 Essay</a>

### 功能特性

- 支持服务端渲染
- PWA渐进式web应用
- 轻量级Markdown编辑器
- 支持标签、分类、搜索、单页、评论、邮件通知、草稿箱等功能


### 运行

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

$ yarn # 

$ npm run dev # 访问 http://127.0.0.1:3025
```

**注意:** 不要用`localhost`访问，因为cookie的domain只支持了 `127.0.0.1`

### 配置说明

配置文件在`server/config`目录下，分为测试环境、开发环境和正式环境


```js
module.exports = {
    mongodb: {
        host: '127.0.0.1',
        database: 'essay_dev',
        port: 27017,
        user: '',
        pass: '',
    },
    app: {
        domain: 'http://127.0.0.1:3025',
        siteName: 'Essay',
    },
    // 管理员信息，仅初始化一次
    admin: {
        user: 'admin',
        pass: '123456',
        email: 'qq22337383@gmail.com',
    },
    // 如果要上线记得修改 secret，确保安全性
    jwt: {
        expiresIn: 365 * 86400,
        secret: 'essay',
    },
    // 如果要发送通知邮件，需要配置 SMTP 服务
    email: {
        host: 'smtp.qq.com',
        user: '22337383@qq.com',
        pass: '',
    },
    // 如果需要支持 GitHub 登录，需要配置 clientID 和 secret
    github: {
        id: '9588f02db3f89d176f36',
        secret: '10f4f1daa81764664fafb2e50be2c6985ef139f8',
        scope: 'user',
    },
    // 如果需要支持自动化部署，需要配置服务器 IP，项目repo地址，服务器目录
    pm2: {
        host: '116.196.17.78',
        repo: 'git@github.com:wmui/essay.git',
        path: '/root/blog',
    },
}
```

管理员默认登录邮箱：`qq22337383@gmail.com`，默认密码：`123456`

### 线上部署

如果需要部署到线上，可以参考这里[Node项目自动化部署](https://github.com/wmui/web-deploy)

如果感觉自动化部署太麻烦，可以简单部署

```bash
$ git clone https://github.com/wmui/essay

$ cd essay

$ yarn

$ npm run build

pm2 start npm --name "Essay" -- start # pm2 启动
```

### 开源协议

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)  
