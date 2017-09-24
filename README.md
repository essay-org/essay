<a href="https://travis-ci.org/wmui/vueblog"><img src="https://travis-ci.org/wmui/vueblog.svg?branch=master" alt="Build Status"></a>
<a href="https://github.com/wmui/vueblog"><img src="https://img.shields.io/badge/node-%3E%3D7.0.0-orange.svg" alt="Version"></a>
<a href="https://github.com/wmui/vueblog"><img src="https://img.shields.io/badge/license-AGPL-blue.svg" alt="License"></a>
### 预览
- [在线演示](https://vueblog.86886.wang)  
- [API说明](https://github.com/wmui/vueblog/wiki)  

> 如果演示网址无法访问，是由于我在阿里云服务器安装了部分软件导致的，一般过几个小时就自己恢复了，实在抱歉。 

### 版本更新
- v1.0.1 前端模板使用css3 flexbox进行了重构  
- v1.1.0 添加管理员在前台可编辑和删除文章功能  
- v1.1.1 添加[评论组件](https://github.com/vue-blog)  
- v1.1.2 添加eslint语法检测工具  
- v1.2.0 增加文章上传图片功能  

### 最新计划
- [X] 添加eslint语法检测工具
- [X] 文章上传图片功能
- [ ] 支持图片上传的markdown编辑器插件
- [ ] 手机端模板调整(APP标准)
- [ ] 增加单元测试

### 开发环境和技术栈
- 操作系统：windows10 64位
- 开发工具 ：webstorm sublime
- 前端：Vue + vue-router + vuex 
- 后端：Node.js(采用express框架) + mongodb

###  特色功能
- 支持服务端渲染
- 支持标题动态切换
- 支持PWA
- 支持markdown语法，样式采用github风格，代码高亮
- 支持文章保存为草稿
- 支持标签和归档功能

### 目录结构
```
    ┌─ build                          // 配置文件
    ├─ example                        // 演示
    ├─ public                         // 公共资源
    ├─ server                         // 服务端
    │      ├─ db.js                   // 数据库dao层封装
    │      ├─ md5.js                  // 密码加密
    │      ├─ router.js               // 服务端路由
    │      └─ settings.js             // 数据库初始化配置
    ├─src                             // 前端
    │   ├─ api                        // 所有的api请求
    │   ├─ assets                     // 前端模板
    │   ├─ components                 // vue组件
    │   │          ├─ admin           // 后台可复用组件
    │   │          └─ global          // 前端可复用组件
    │   ├─ router                     // 前端路由
    │   ├─ store                      // vuex文件
    │   ├─ util                       // 公共函数库
    │   │    ├─ filters.js            // 过滤器函数
    │   │    └─ title.js              // 标题函数
    │   ├─ views                      // 组件库
    │   │    ├─ admin                 // 后台组件
    │   │    ├─ Article.vue           // 文章详情页
    │   │    ├─ CreateListView.js     // 预渲染
    │   │    ├─ List.Vue              // 文章列表
    │   │    └─ Login.Vue             // 登陆
    │   ├─ app.js                     // 项目入口文件
    │   ├─ App.vue                    // 全局组件
    │   ├─ entry-client.js            // 客户端渲染
    │   ├─ entry-server.js            // 服务端渲染
    │   └─ index.template.html        // 模板
    ├─ static                         // 静态文件
    ├─ .babelrc                       // babel配置
    ├─ .gitignore                     // git上传忽略
    ├─ ecosystem.json                 // pm2配置
    ├─ manifest.json                  // PWA配置
    ├─ LICENSE                        // 开源协议
    ├─ package.json                   // npm包管理
    ├─ README.md                      // 项目说明
    ├─ server.js                      // 项目启动文件
    └─ yarn.lock                      // yarn配置
```

### pc端效果图 
#### 首页效果图
![image](https://github.com/wmui/vueblog/blob/master/example/demo/01.png)  
#### 代码高亮效果图
![image](https://github.com/wmui/vueblog/blob/master/example/demo/02.png)  
#### 后台发布页面
![image](https://github.com/wmui/vueblog/blob/master/example/demo/03.png)  
#### 后台文章列表
![image](https://github.com/wmui/vueblog/blob/master/example/demo/04.png)  
#### 修改个人信息
![image](https://github.com/wmui/vueblog/blob/master/example/demo/05.png)  

### 手机端效果图，以chrome浏览器演示
#### 添加到主屏
![image](https://github.com/wmui/vueblog/blob/master/example/demo/wap-01.png)
#### 文章页效果
![image](https://github.com/wmui/vueblog/blob/master/example/demo/wap-02.png)

### Lighthouse测试
![image](https://github.com/wmui/vueblog/blob/master/example/demo/g-01.png)

### 本地运行项目
1. 安装[mongodb](https://www.mongodb.com/download-center?jmp=nav#community)并启动
2. 安装[nodejs](https://nodejs.org/en/)环境
3. 打开本地终端，执行`npm install`,`npm run dev `,访问http://localhost:8080  
4. 后台的默认用户名：q，默认密码：q

### 结语
本项目基于[vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)开发，长期更新，由于是个人项目，不建议直接用于线上，欢迎issue，欢迎PR，该项目不会添加过多复杂功能，追求轻量，以原生APP的体验作为目标。 

后期会把部分功能插件化，之所以自己开发[vue插件](https://github.com/orgs/vue-blog)，并不是我喜欢造轮子，真的是找不到满意的轮子，比如说markdown编辑器，要么不支持图片上传，要么体积特别大，所以我决定全部自己开发。时间如果充足的话，我会更新所有的开发教程。  

### 开源协议
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
