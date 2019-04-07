module.exports = {
    mongodb: {
        host: '127.0.0.1',
        database: 'essay',
        port: 27017,
        user: '',
        pass: '',
    },
    app: {
        domain: 'https://www.86886.wang',
        siteName: 'Essay',
    },
    admin: {
        user: 'admin',
        pass: '123456',
        email: 'qq22337383@gmail.com',
    },
    jwt: {
        expiresIn: 365 * 86400,
        secret: '',
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
