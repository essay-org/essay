
<a href="https://travis-ci.org/wmui/essay"><img src="https://travis-ci.org/wmui/essay.svg?branch=master" alt="Build Status"></a>
<a href="https://github.com/wmui/vueblog"><img src="https://img.shields.io/badge/node-%3E%3D8.9.1-orange.svg" alt="Version"></a>
<a href="https://github.com/wmui/essay"><img src="https://img.shields.io/badge/license-AGPL-blue.svg" alt="License"></a>

## Essay

<p><a href="https://www.86886.wang" target="_blank">演示站</a></p>

Essay 原名叫 VueBlog，是一个基于 Nuxt2 开发的轻量级的博客应用

Essay 从3.0开始采用前后端完全分离的开发模式，前端和后端均需要单独部署，服务端代码[移步至此](https://github.com/wmui/essay-server)。

**说明：** 3.0之前的版本也是前后端分离的，只不过是前后端同构应用，因此只需要开启一项服务。考虑到代码的易读性和可维护性，遂将其完全分离


### 功能特性

- 支持服务端渲染
- PWA渐进式web应用
- 轻量级Markdown编辑器
- 支持标签、文章搜索、评论、邮件通知和草稿箱等功能

### 本地运行

#### 后端

如果只是想在本地查看下前端运行效果，可以修改下`store/getters.js`中的baseUrl，而不需要本地运行[服务端代码](https://github.com/wmui/essay-server)

```js
baseUrl() {
  let host
  if (process.env.NODE_ENV === 'production') {
    host = 'https://api.86886.wang/v1'
  } else {
    // host = 'http://127.0.0.1:3010/v1'
    host = 'https://api.86886.wang/v1' // 开发环境连接远程接口服务
  }
  return host
},
```

如果要查看完整的运行效果，则需要先运行[服务端代码](https://github.com/wmui/essay-server)，开启接口服务

#### 前端

```bash
$ git clone https://github.com/wmui/essay

$ cd essay

$ yarn # 或 npm install

$ npm run dev # 访问 http://127.0.0.1:3000
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

我正在计划开发一个通用的Node项目部署脚本，因为我发现整个部署流程还是比较麻烦的，希望能通过一个命令按照提示便可以把环境搭建起来

### 更新说明

v1.0.0-v1.2.1： 前后端同构，基于express服务端渲染，原生Vue SSR

v2.0.0-v2.3.1：前后端同构，基于koa服务端渲染，采用Nuxt1.x框架开发

v3.0.0：前后端分离，前端基于Nuxt2.x开发，后端基于express开发

### 开源协议

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)  
