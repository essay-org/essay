![](https://travis-ci.org/wmui/vueblog.svg?branch=master)
### 预览
- [在线演示](https://vueblog.86886.wang)

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
#### 启动效果
![image](https://github.com/wmui/vueblog/blob/master/example/demo/wap-02.png)
#### 首页效果
![image](https://github.com/wmui/vueblog/blob/master/example/demo/wap-03.png)
#### 文章页效果
![image](https://github.com/wmui/vueblog/blob/master/example/demo/wap-04.png)

### 本地运行项目
**注意**：Node.js版本要求7以上  
1. 安装[mongodb](https://www.mongodb.com/download-center?jmp=nav#community)并启动
2. 安装[nodejs](https://nodejs.org/en/)环境
3. 修改`/server/settings.js`下的配置项信息，你也可以默认不修改，默认用户名:q，默认密码：q

```
    let user = 'q';
    let pass = md5('q');
    let avatar = 'avatar.jpg';
    let intro ='Never too old to learn';
    let nickname = 'VueBlog';
    module.exports = {
        dbUrl:'mongodb://localhost:27017/vueblog',
        user:user,
        pass:pass,
        avatar:avatar,
        intro:intro,
        nickname:nickname
    }
```
4. 打开本地终端，执行`npm install`,`npm run dev `,访问http://localhost:8080  

### 教程更新
- [nodejs服务器部署教程一](https://segmentfault.com/a/1190000010098126)
- [nodejs服务器部署教程二，把vue项目部署到线上](https://segmentfault.com/a/1190000010205995)
- [nodejs服务器部署教程三，部署基于node+vue+mongodb的项目](https://segmentfault.com/a/1190000010213434)
- [nodejs服务器部署教程四，部署ssl证书，升级为https](https://segmentfault.com/a/1190000010281512)

### 结语
本项目基于[vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)开发，长期更新，由于是个人项目，不建议直接用于线上，欢迎issue，欢迎PR。

### 开源协议
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)





