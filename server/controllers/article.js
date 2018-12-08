const mongoose = require('mongoose')
const Article = mongoose.model('Article')

// flag: 0置顶 1首页 2非首页 3草稿
exports.getArticles = async (req, res, next) => {
  let {
    page = 1, 
    limit = 15, 
    id = '', 
    keyword = ''
  } = req.params

  let flag = res.locals.flag
  
  let findOption = {}
  keyword = decodeURIComponent(keyword)
  page = Number((page - 1) * limit) || 0
  limit = Number(limit) || 15
  let reg = new RegExp(keyword, 'i')

  if (id) {
    // 根据标签id查询
    findOption = {
      flag: {
        $ne: 3
      },
      tags: [id]
    }
  } else if (keyword) {
    // 根据keyword 搜索查询
    findOption = {
      flag: {
        $ne: 3
      },
      $or: [{
        title: {
          $regex: reg
        }
      }, {
        content: {
          $regex: reg
        }
      }]
    }
  } else {
    // 首页文章
    findOption = {
      flag
    }
  }
  try {
    let total = (await Article.find(findOption).exec()).length

    let data = await Article.find(findOption)
      .populate({
        path: 'tags',
        select: 'id name'
      })
      .skip(page)
      .limit(limit)
      .sort({
        'created_at': -1
      })
      .exec()

    res.json({
      success: true,
      data: data,
      total: total
    })
  } catch (e) {
    res.json({
      success: false,
      err: e,
      total: 0
    })
  }
}

exports.getArticle = async (req, res, next) => {
  let id = req.params.id

  try {
    let article = await Article.findOne({
        _id: id
      })
      .populate({
        path: 'tags',
        select: 'id name'
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      })
      .exec()

    /*article.previousArticle = await Article.findOne({flag: 1, _id: {$gt: id}})
    .sort({_id: 1 })
    .limit(1)
    .select('id title')
    .exec()

    article.nextArticle = await Article.findOne({flag: 1,  _id: {$lt: id}})
    .sort({_id: -1 })
    .limit(1)
    .select('id title')
    .exec()*/

    await Article.findByIdAndUpdate(id, {
      views: article.views + 1
    }).exec()
    res.json({
      success: true,
      data: article
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

exports.postArticle = async (req, res, next) => {
  let body = req.body

  try {
    body = await new Article(body)
    await body.save()
    res.json({
      success: true,
      data: body
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

// 修改文章
exports.patchArticle = async (req, res, next) => {
  let body = req.body
  body.updated_at = Date.now()

  try {
    body = await Article.findByIdAndUpdate(body.id, body).exec()
    res.json({
      success: true,
      data: body
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}

exports.deleteArticle = async (req, res, next) => {
  let id = req.params.id

  try {
    let body = await Article.findByIdAndRemove(id).exec()
    res.json({
      success: true,
      data: body
    })
  } catch (e) {
    res.json({
      success: false,
      err: e
    })
  }
}
