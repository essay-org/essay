const isPro = process.env.NODE_ENV === 'production'

module.exports = {
  mongodb: {
    host: '127.0.0.1',
    database: 'essay',
    port: 27017,
    user: '',
    pass: '',
  },
  app: {
    domain: isPro ? 'https://www.86886.wang' : 'http://127.0.0.1:3025',
  },
  admin: {
    username: 'admin',
    nickname: 'wmui',
    password: '123456',
    description: '前端工程师',
    email: 'qq22337383@gmail.com',
  },
  jwt: {
    expiresIn: 365 * 86400,
    secret: 'essay', // 如果部署到线上，一定要修改
  },
  pm2: {
    host: '116.196.17.78',
    repo: 'git@github.com:wmui/blog.git',
    path: '/root/blog',
  },
}
