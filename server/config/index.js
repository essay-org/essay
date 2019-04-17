module.exports = {
    mongodb: {
        host: '127.0.0.1',
        database: 'essay',
        // database: 'essay_test',
        port: 27017,
        user: '',
        pass: '',
    },
    app: {
        // domain: 'https://www.86886.wang',
        domain: 'http://127.0.0.1:3025',
        siteName: 'Essay',
    },
    admin: {
        user: 'admin',
        pass: '123456',
        email: 'qq22337383@gmail.com',
    },
    // 如果部署到线上，一定要修改secret、一定要修改secret、一定要修改secret
    jwt: {
        expiresIn: 365 * 86400,
        secret: 'essay',
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
        repo: 'git@github.com:wmui/essay.git',
        path: '/root/essay',
    },
}
