module.exports = {
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
    database: 'essay-dev',
    port: 27017,
    username: '',
    password: '',
  },
  githubConfig: {
    githubClient: '9588f02db3f89d176f36',
    githubSecret: '10f4f1daa81764664fafb2e50be2c6985ef139f8',
    scope: 'user',
  },
  emailConfig: {
    user: '',
    pass: '',
  },
}
