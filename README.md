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
- Support Tag, Category, Search, Page, Comment, Email notification and Draft box.


### Bootstrap

#### Run MongoDB

Please install [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) and [Node.js](https://nodejs.org/en/), then start the database.

```bash
# yourDBpath is your DB folder(Any position)
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
module.exports = {
    mongodb: {
        host: '127.0.0.1',
        database: 'essay',
        port: 27017,
        user: '',
        pass: '',
    },
    app: {
        domain: 'http://127.0.0.1:3025',
        siteName: 'Essay',
    },
    // Init admin information
    admin: {
        user: 'admin',
        pass: '123456',
        email: 'qq22337383@gmail.com',
    },
    // Secret is very important, please remember to modify it.
    jwt: {
        expiresIn: 365 * 86400,
        secret: 'essay',
    },
    // If you want to send Email when received a comment, please config SMTP Server.
    email: {
        host: 'smtp.qq.com',
        user: '22337383@qq.com',
        pass: '',
    },
    // If you want to support GitHub login，please config clientID and secret.
    github: {
        id: '9588f02db3f89d176f36',
        secret: '10f4f1daa81764664fafb2e50be2c6985ef139f8',
        scope: 'user',
    },
    // If you want to support auto deploy，please config Server IP, repo and path.
    pm2: {
        host: '116.196.17.78',
        repo: 'git@github.com:wmui/essay.git',
        path: '/root/essay',
    },
}
```

Default login email: `qq22337383@gmail.com`
Default login password: `123456`

### Deploy Essay

If you want to deploy on production environment, you can do just like this

```bash
$ git clone https://github.com/wmui/essay

$ cd essay

$ yarn

$ npm run build

$ pm2 start npm --name "Essay" -- start
```

如果需要自动化部署，可以参考这里[Node项目自动化部署](https://github.com/wmui/web-deploy)

### Join us

QQ群：488268810

### License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)  
