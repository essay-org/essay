export default {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    email: 'qq22337383@gmail.com',
    nickname: 'VueBlog',
    motto: 'Never too old to learn',
    avatar: 'avatar.png'
  },
  jwt: {
    secret: 'vueblog',
    expiresIn: 60 * 60 * 24 * 30
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'blog',
    port: 27017,
    username: '',
    password: ''
  },
  app: {
    port: process.env.PORT || 9000,
    routerBaseApi: '/api'
  }
}
