<p align="center">
<img src="https://www.86886.wang/public/picture/1554636859240.png">
</p>

<p align="center">
<a href="https://travis-ci.org/wmui/essay"><img src="https://travis-ci.org/wmui/essay.svg?branch=master" alt="Build Status"></a>
<a href="https://github.com/wmui/essay"><img src="https://img.shields.io/badge/node-%3E%3D8.12.0-orange.svg" alt="Version"></a>
<a href="https://github.com/wmui/essay"><img src="https://img.shields.io/badge/license-AGPL-blue.svg" alt="License"></a>
</p>

<p align="center"><a href="https://www.86886.wang" target="_blank">Demo Site</a></p>

> Essay - Simple but not simple blog system

### Features

- Support server rendering.
- Progressive Web Apps.
- Lightweight Markdown editor based on VueJS.
- Support Category, Search, Comment, Email notification and Draft box.

### Bootstrap

#### Run MongoDB

Please install [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) and [Node.js](https://nodejs.org/en/), then start the database.

```bash
# yourDBpath is your DB folder(anywhere)
$ sudo mongod --dbpath yourDBpath
```

#### Run Essay

```bash
$ git clone https://github.com/wmui/essay

$ cd essay

$ yarn

$ npm run dev # Visit http://127.0.0.1:3025
```

**Tips:** Do not use `localhost` visit the project, because of cookie is domain only support `127.0.0.1`.

### Global Config

Global config file is `server/config/global.config.js`, the default configuration like this

```js
const isPro = process.env.NODE_ENV === "production";

module.exports = {
  mongodb: {
    host: "127.0.0.1",
    database: "essay",
    port: 27017,
    user: "",
    pass: ""
  },
  app: {
    domain: isPro ? "https://www.86886.wang" : "http://127.0.0.1:3025"
  },
  admin: {
    username: "admin",
    nickname: "wmui",
    password: "123456",
    description: "前端工程师",
    email: "qq22337383@gmail.com"
  },
  jwt: {
    expiresIn: 365 * 86400,
    secret: "essay" // Secret is very important, please modify it.
  },
  // If you want to support auto deploy，please config Server IP, repo and path.
  pm2: {
    host: "116.196.17.78",
    repo: "git@github.com:wmui/blog.git",
    path: "/root/blog"
  }
};
```

Default login username: `admin`
Default login password: `123456`

### Deploy Essay

If you want to deploy on production environment, you can just do like this

```bash
$ git clone https://github.com/wmui/essay

$ cd essay

$ yarn

$ npm run build

$ pm2 start npm --name "essay" -- start
```

如果需要自动化部署，可以参考这里[Node 项目自动化部署](https://github.com/wmui/web-deploy)

### Join us

QQ 群：4882 68810

### License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
