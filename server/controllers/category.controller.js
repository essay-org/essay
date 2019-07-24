const mongoose = require('mongoose')

const Category = mongoose.model('Category')
const Article = mongoose.model('Article')

exports.getCategories = async (req, res, next) => {
  try {
    const { role } = res.locals.user
    const opt = role === 'superAdmin'
      ? {}
      : { isShow: true }

    let categories = await Category.find(opt)
      .sort({
        sort: -1,
      })
      .exec()

    // 查询分类下文章数量
    const arr = await Article
      .aggregate([
        { $match: { isPublish: true } },
        { $group: { _id: '$category', total: { $sum: 1 } } },
      ])
      .exec()
    // 待优化
    categories = JSON.parse(JSON.stringify(categories))

    const data = categories.map((category) => {
      const t = arr.find(item => String(item._id) === String(category.id))
      return {
        ...category,
        total: t ? t.total : 0,
      }
    })

    res.handleSuccess(data)
  } catch (error) {
    res.handleError('分类获取失败', error)
  }
}


exports.getCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await Category.findOne({
      _id: id,
    }).exec()
    res.handleSuccess(data)
  } catch (error) {
    res.handleError('分类详情获取失败', error)
  }
}

exports.postCategory = async (req, res, next) => {
  const msg = req.checkBody({
    title: {
      required: '名字不能为空',
    },
  })
  if (msg) return res.handleError(msg)
  try {
    const { body } = req
    let data = await Category.findOne({ title: body.title })
    if (data) { res.handleError('分类已存在') }
    data = await new Category(body).save()
    res.handleSuccess(data)
  } catch (error) {
    res.handleError('分类创建失败', error)
  }
}

exports.patchCategory = async (req, res, next) => {
  const msg = req.checkBody({
    title: {
      required: '名字不能为空',
    },
  })
  if (msg) return res.handleError(msg)

  try {
    let { body } = req
    const { id } = req.params
    body = await Category.findByIdAndUpdate(id, body).exec()
    res.handleSuccess(body)
  } catch (error) {
    res.handleError('分类更新失败', error)
  }
}

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const body = await Category.findByIdAndRemove(id).exec()
    res.handleSuccess(body)
  } catch (error) {
    res.handleError('分类删除失败', error)
  }
}
