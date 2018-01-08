## VueBlog v2
### 前言
VueBlog从2.0版本开始是采用Nuxt.js开发的，之前的版本是基于Vue.js开发的，可在Tags标签下查看所有版本。  

### 导航
- [演示站](http://vueblog.86886.wang) （服务器不在国内，速度可能稍慢）
- [线上部署](https://github.com/wmui/web-deploy)

### 版本更新
- v2.0.0  前后端完全分离，需分别部署前端和后端服务
- v2.1.0  前后端同构，Node既做渲染服务又做api服务

### 最新计划
- 后台服务用Koa + mongoose重写  
- 提供支持GraphQL和RESTful的双版本API

### 开发环境和技术栈
- 操作系统： windows10
- 开发工具： Visual Studio Code
- 前端： Nuxt.js + vuex
- 后端： Node.js + MongoDB

### 特色功能
- 支持服务端渲染
- 支持PWA
- 支持Markdown编辑器，可上传图片，代码高亮
- 支持文章发布，保存草稿，在线编辑
- 支持自动创建标签和归档

### 效果图
#### 首页
![](https://github.com/wmui/vueblog/raw/master/example/index.png)  
#### 代码高亮
![](https://github.com/wmui/vueblog/raw/master/example/code.png)  
#### 后台
![](https://github.com/wmui/vueblog/raw/master/example/list.png)  
#### 编辑器（基于Vue开发）
![](https://github.com/wmui/vueblog/raw/master/example/editor.png)  

### 本地运行
- 安装[MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)数据库和[Node.js](https://nodejs.org/en/)环境
- 开启数据库服务，以windows电脑为例: 在桌面上新建一个`demo`文件夹，命令行执行`mongod --dbpath c:demo`就成功在本地开启服务了
- 运行项目
```shell
  git clone https://github.com/wmui/vueblog.git
  cd vueblog
  npm install nuxt
  npm install
  npm run dev
  # 访问http://localhost:3000/
```
- 默认用户名: q， 默认密码: q  
**说明：** 首次编译会比较慢，一定要等到编译进度条100%才能正常访问，node的版本建议8.9.3稳定版，另外之所以先执行`npm install nuxt`再执行`npm install` 是为了防止`nuxt`中的依赖包和其它项目中的依赖包出现版本冲突，导致安装失败。

### 结语
VueBlog长期更新，由于是个人项目，不建议直接用于线上，欢迎issue，欢迎PR  

### 开源协议
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)  
