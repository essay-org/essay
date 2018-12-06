<a href="https://travis-ci.org/wmui/essay"><img src="https://travis-ci.org/wmui/essay.svg?branch=master" alt="Build Status"></a>
<a href="https://github.com/wmui/essay"><img src="https://img.shields.io/badge/license-AGPL-blue.svg" alt="License"></a>

## Essay

[中文文档](https://github.com/wmui/essay/blob/master/README.md)

<p><a href="https://www.86886.wang" target="_blank">Live Demo</a></p>

Essay is a lightweight blog application

### Technology stack

- FrontEnd: Nuxt.js and Vuex
- BackEnd: Mongoose and Koa

### Features

- Server Side Rendering.
- Progressive Web App.
- A lightweight markdown editor based on Vue.js.

### Build Setup

First install [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) and [Node.js](https://nodejs.org/en/)

#### Start mongodb

```bash
# yourDBpath is your database folder
sudo mongod --dbpath yourDBpath
```

#### Start project

``` bash
# install dependencies
yarn # or npm install

# serve in dev mode, with hot reload at http://127.0.0.1:3000
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

**Tips：** Useing `http://127.0.0.1:3000` replace `http://localhost:3000` visit your local project

### Global config

The config file is `/server/config/index.js`.

The default uername is `q` and password is `q`.

```javascript
export default {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    email: 'qq22337383@gmail.com',
    nickname: 'Essay',
    motto: 'Never too old to learn'
  },
  jwt: {
    secret: 'essay'
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'essay',
    port: 27017,
    username: '',
    password: ''
  },
  githubConfig: {
    githubClient: '',
    githubSecret: '',
    scope: 'user'
  },
  emailConfig: {
    user: '',
    pass: ''
  },
  app: {
    domain: '',
    host: '127.0.0.1',
    port: 3000,
    routerBaseApi: 'api'
  }
}
```

### License

[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
