module.exports =  {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    nickname: 'Essay',
    email: 'qq22337383@gmail.com',
    motto: 'Never too old to learn',
  },
  jwt: {
    secret: 'essay',
    expiresIn: 1296000,
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'essay',
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
    domain: 'https://www.86886.wang',
    baseApi: '/v1',
  },
}
