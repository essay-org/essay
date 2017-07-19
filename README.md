### 感悟
历时两个多月，终于利用工作之余完成了这个项目的1.0版本，为什么要写这个项目？其实基于vuejs+nodejs构建的开源博客系统有很多，但是大多数不支持服务端渲染，也不支持动态标题，只是做到了前后端分离，对于博客类系统seo肯定很重要，索性就自己动手写了这个项目，其中也遇到了不少问题， 因为基于服务端渲染的项目不多，自己能力也有限，所以用了好长时间。这里特别感谢[@lincenying](https://github.com/lincenying)，提供了登录功能的解决思路，也是我在开发过程中遇到最难解决的问题，本项目基于[vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)开发，支持PWA(需升级为https)，演示地址：https://vueblog.86886.wang
### 开发环境和技术栈
- 操作系统：windows 10 64位  
- 开发工具 ：webstrom sublime   
- 前端：vue.js + vue-router + vuex   
- 后端：node.js + mongodb (采用express框架)   
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
    │   ├─ views                      // 公共函数库
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
更多效果大家可通过线上演示地址查看  
### 本地运行项目
1. 安装[mongodb](https://www.mongodb.com/download-center?jmp=nav#community)并启动  
2. 安装[nodejs](https://nodejs.org/en/)环境
3. 下载项目到你的本地   
4. 修改配置项信息，/server/settings.js，你也可以默认不修改，默认用户名:q，默认密码：q  

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
5. 打开本地终端，执行`npm run dev `,访问http://localhost:8080  
### 结语
此项目长期更新，由于是个人项目，不建议直接用于线上，遇到问题欢迎issue，知无不答，也欢迎大家贡献代码，一起学习，共同进步，做一个完美的博客系统
### 教程更新
- [nodejs服务器部署教程一](https://segmentfault.com/a/1190000010098126)
- [nodejs服务器部署教程二，把vue项目部署到线上](https://segmentfault.com/a/1190000010205995)
- [nodejs服务器部署教程三，部署基于node+vue+mongodb的项目](https://segmentfault.com/a/1190000010213434)





