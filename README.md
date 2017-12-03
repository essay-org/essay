## VueBlog v2

### 前言
VueBlog从2.0版本开始是采用Nuxt.js开发的，之前的版本是基于Vue.js开发的，可在Tags标签下查看所有版本，为了更好地做到前后端分离，从2.0开始前端和后端分别在不同的仓库。

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
#### 图片上传
![](https://github.com/wmui/vueblog/raw/master/example/upload.png)  

### 本地运行

- 运行[vueblog-server](https://github.com/wmui/vueblog-server)后端服务
- 运行vueblog前端服务
```shell
  git clone https://github.com/wmui/vueblog.git
  cd vueblog
  npm install
  npm run dev
  # 访问http://localhost:3010/
``` 

### 导航
- [演示站](http://vueblog.86886.wang) 由于服务器不在国内，速度可能稍慢  
- [线上部署](https://github.com/wmui/web-deploy)

### 结语
VueBlog长期更新，由于是个人项目，不建议直接用于线上，欢迎issue，欢迎PR  

### 开源协议
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)  
