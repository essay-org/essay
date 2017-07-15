### 感悟
历时两个多月，终于利用工作之余完成了这个项目的1.0版本，为什么要写这个项目？其实基于vuejs+nodejs构建的开源博客系统有很多，但是大多数不支持服务端渲染，也不支持动态标题，只是做到了前后端分离，对于博客类系统seo肯定很重要，索性就自己动手写了这个项目，其中也遇到了不少问题， 因为基于服务端渲染的项目不多，自己能力也有限，所以用了好长时间。这里特别感谢[@lincenying](https://github.com/lincenying)，提供了登录功能的解决思路，也是我在开发过程中遇到最难解决的问题，本项目基于[vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)开发，支持PWA(需升级为https)，演示地址：https://vueblog.86886.wang
### 开发环境和技术栈
操作系统：windows 10 64位
开发工具 ：webstrom sublime
前端：vue.js + vue-router + vuex
后端：node.js + mongodb (采用express框架)
###  特色功能
支持服务端渲染
支持标题动态切换
支持PWA
支持maekdown语法，样式采用github风格，代码高亮
支持文章保存为草稿
支持标签和归档功能
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
项目地址：https://github.com/wmui/vueblog
1. 安装mongod并启动
2. 安装git工具
3. 克隆项目到你的本地
4. 修改配置项信息，/server/settings.js，你也可以默认不修改，默认用户名:q，默认密码：q
```
let user = 'q';
let pass = md5('q');
let avatar = 'avatar.jpg';//头像
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
#### 结语
关于如何部署到线上和部署https，后面会更新相关教程，由于我也是初入职场不久前端，所以代码写的不完美还请大家见谅，大神们请默默飘过。此项目我会长期更新，希望能和大家一起学习，共同进步