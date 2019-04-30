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
        siteName: 'Essay',
    },
    admin: {
        user: 'admin',
        pass: '123456',
        email: 'qq22337383@gmail.com',
    },
    jwt: {
        expiresIn: 365 * 86400,
        secret: 'essay',
    },
    seo: {
        title: 'Essay-简约而不简单的博客系统',
        keywords: 'Essay，JavaScript博客系统，NodeJS博客系统',
        description: 'Essay，基于JavaScript构建的前后端同构博客系统，遵循简约而不简单的设计哲学，让每个人都可以方便的记录自己的生活，记录自己的人生',
    },
    email: {
        host: 'smtp.qq.com',
        user: '22337383@qq.com',
        pass: '',
    },
    github: {
        id: '',
        secret: '',
        scope: 'user',
    },
    pm2: {
        host: '116.196.17.78',
        repo: 'git@github.com:wmui/blog.git',
        path: '/root/blog',
    },
}
