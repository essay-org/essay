export default {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    nickname: 'Essays',
    email: 'qq22337383@gmail.com',
    motto: 'Never too old to learn'
  },
  jwt: {
    secret: 'vueblog',
    expiresIn: 1296000,
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'vueblog',
    port: 27017,
    username: '',
    password: '',
  },
  githubConfig: {
    githubClient: '',
    githubSecret: '',
    scope: 'user',
  },
  emailConfig: {
    user: '',
    pass: '',
  },
  app: {
    domain: '',
    host: '127.0.0.1',
    port: 3000,
    routerBaseApi: 'api',
  },
}
