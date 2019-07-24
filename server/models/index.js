const mongoose = require('mongoose')
const requireAll = require('require-all')
const path = require('path')
const globalConfig = require('../config/global.config')

requireAll({
  dirname: path.join(__dirname, './'),
  filter: /(.+)\.model\.js$/,
})

const User = mongoose.model('User')
const Article = mongoose.model('Article')
const Category = mongoose.model('Category')
const Option = mongoose.model('Option')

const mongoUrl = `mongodb://${globalConfig.mongodb.host}:${globalConfig.mongodb.port}/${globalConfig.mongodb.database}`

mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.connection
  .openUri(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    user: globalConfig.mongodb.user,
    pass: globalConfig.mongodb.pass,
  })
  .once('open', async () => {
    const superAdmin = await User.findOne({
      role: 'superAdmin',
    }).exec()

    const defaultCategory = await Category.findOne({
      title: '默认分类',
    }).exec()

    // 数据初始化
    if (!superAdmin) {
      await new User({
        role: 'superAdmin',
        ...globalConfig.admin,
      }).save()

      // seo
      await new Option({
        name: 'seo',
        value: {
          title: 'Essay-简约而不简单的博客系统',
          keywords: 'Essay，JavaScript博客系统，NodeJS博客系统',
          description: 'Essay，基于JavaScript构建的前后端同构博客系统',
        },
      }).save()

      // smtp 自动发邮件
      await new Option({
        name: 'email',
        value: {
          host: '',
          user: '',
          pass: '',
        },
      }).save()
    }

    if (!defaultCategory) {
      await new Category({
        title: '默认分类',
        keywords: '默认分类',
        description: '默认分类',
      }).save()
    }
  })
  .on('error', (error) => {
    console.warn('数据库连接失败', error)
  })
