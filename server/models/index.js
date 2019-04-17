const mongoose = require('mongoose')
const config = require('../config')
require('./user')
require('./comment')
require('./media')
require('./tag')
require('./category')
require('./article')
require('./page')

const User = mongoose.model('User')
const Article = mongoose.model('Article')
const mongoUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.connection
    .openUri(mongoUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        user: config.mongodb.user,
        pass: config.mongodb.pass,
    })
    .once('open', async () => {
        let user = await User.findOne({
            role: 'superAdmin',
        }).exec()

        // 数据初始化
        if (!user) {
            user = new User({
                role: 'superAdmin',
                username: config.admin.user,
                password: config.admin.pass,
                email: config.admin.email,
                loginMode: 'register',
                avatar: `${config.app.domain}/public/avatar/default.jpg`,
            })

            const article = new Article({
                user: user.id,
                title: '欢迎使用 Essay 博客系统',
                content: '当您看到这篇文章，说明系统已经安装成功，接下来开始您的创作之旅吧',
                isPublish: true,
            })

            user.save()
            article.save()
        }
    })
    .on('error', (error) => {
        console.warn('数据库连接失败', error)
    })
