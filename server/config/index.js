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
        id: '9588f02db3f89d176f36',
        secret: '10f4f1daa81764664fafb2e50be2c6985ef139f8',
        scope: 'user',
    },
    pm2: {
        host: '116.196.17.78',
        repo: 'git@github.com:wmui/essay.git',
        path: '/root/essay',
    },
}
