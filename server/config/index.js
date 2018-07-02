export default {
  // 初始化管理员信息，后台可以修改
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
    secret: 'vueblog'
  },
  // 数据库配置，默认即可
  mongodb: {
    host: '127.0.0.1',
    database: 'vueblog',
    port: 27017,
    username: '',
    password: ''
  },
  // github登录需要的密钥
  githubConfig: {
    githubClient: '',
    githubSecret: '',
    scope: 'user'
  },
  // SMTP 邮箱服务 只支持qq邮箱
  emailConfig: {
    user: '',
    pass: ''
  },
  app: {
    domain: '', // 如果需要部署到线上，必须填写域名，并且带协议地址
    host: '127.0.0.1',
    port: 3000,
    routerBaseApi: 'api'
  }
}
