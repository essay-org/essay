module.exports = {
    mongodb: {
        host: '127.0.0.1',
        database: 'essay_dev',
        port: 27017,
        user: '',
        pass: '',
    },
    app: {
        domain: 'http://127.0.0.1:3025',
        siteName: 'Essay',
    },
    // 管理员信息，仅初始化一次
    admin: {
        user: 'admin',
        pass: '123456',
        email: 'qq22337383@gmail.com',
    },
    // 如果要上线记得修改 secret，确保安全性
    jwt: {
        expiresIn: 365 * 86400,
        secret: 'essay',
    },
    // 如果要发送通知邮件，需要配置 SMTP 服务
    email: {
        host: 'smtp.qq.com',
        user: '22337383@qq.com',
        pass: '',
    },
    // 如果需要支持 GitHub 登录，需要配置 clientID 和 secret
    github: {
        id: '9588f02db3f89d176f36',
        secret: '10f4f1daa81764664fafb2e50be2c6985ef139f8',
        scope: 'user',
    },
    // 如果需要支持自动化部署，需要配置服务器 IP，项目repo地址，服务器目录
    pm2: {
        host: '116.196.17.78',
        repo: 'git@github.com:wmui/essay.git',
        path: '/root/blog',
    },
}
