import mongoose from 'mongoose'
import path from 'path'
import os from 'os'
import fs from 'fs'
import formidable from 'formidable'
import config from '../config'
import {
  checkToken
} from '../middlewares/check-token'
const Article = mongoose.model('Article')

const domain = config.app.domain ? config.app.domain : `http://${config.app.host}:${config.app.port}`

// flag: 0置顶 1首页 2非首页 3草稿
export const getArticles = async(ctx, next) => {
  let { page = 1, limit = 15, flag = 1, id = '', keyword = '' } = ctx.params
  let findOption = {}
  keyword = decodeURIComponent(keyword)
  page = Number((page - 1) * limit) || 0
  limit = Number(limit) || 15
  let reg = new RegExp(keyword, 'i')
    
  if (id) {
    // 根据标签id查询
    findOption = { flag: {$ne: 3}, tags: [id] }
  }else if(keyword) {
    // 根据keyword 搜索查询
    findOption = { 
      flag: {$ne: 3}, 
      $or: [{ title: { $regex: reg } }, { content: { $regex: reg } }]
    }
  }else{
    // 首页文章
    findOption = {flag}
  }
  try {
    let total = await Article.find(findOption).exec()
    total = total.length

    let data = await Article.find(findOption)
      .populate({
        path: 'tags',
        select: 'id name'
      })
      .skip(page)
      .limit(limit)
      .sort({ 'createdAt': -1 })
      .exec()

    ctx.body = {
      success: true,
      data: data,
      total: total
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e,
      total: 0
    }
  }
}


export const getDrafts = async(ctx, next) => {
  const data = await Article.find({ flag: 3 })
    .populate({
      path: 'tags',
      select: 'id name'
    })
    .sort({ 'updatedAt': -1 })
    .exec()
  ctx.body = {
    success: true,
    data: data
  }
}

export const getArticle = async(ctx, next) => {
  let { id } = ctx.params
  if (!id) {
    return (ctx.body = {
      success: false,
      err: 'id is required'
    })
  }

  try {
    let article = await Article.findOne({ _id: id })
      .populate({
        path: 'tags',
        select: 'id name'
      })
      .populate({
        path: 'comments',
        populate: { path: 'user'}
        // options: {sort:{createdAt: -1}}
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

    await Article.findByIdAndUpdate(id, { views: article.views + 1 }).exec()
    ctx.body = {
      success: true,
      data: article
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
}

export const postArticle = async(ctx, next) => {
  let body = ctx.request.body
  let { title, content } = body
  if (!title || !content) {
    return (ctx.body = {
      success: false,
      err: 'Field incomplete'
    })
  }

  try {
    body = await new Article(body)
    await body.save()
    ctx.body = {
      success: true,
      data: body
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
}


// 修改文章
export const patchArticle = async(ctx, next) => {
  let body = ctx.request.body
  body.updatedAt = Date.now()
  let { id, title, content } = body
  if (!id || !title || !content) {
    return (ctx.body = {
      success: false,
      err: 'Field incomplete'
    })
  }

  try {
    body = await Article.findByIdAndUpdate(id, body).exec()
    ctx.body = {
      success: true,
      data: body
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
}

export const deleteArticle = async(ctx, next) => {
  let { id } = ctx.params

  if (!id) {
    return (ctx.body = {
      success: false,
      err: 'id is required'
    })
  }

  try {
    let body = await Article.findByIdAndRemove(id).exec()
    ctx.body = {
      success: true,
      data: body
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
}

export const upload = async(ctx, next) => {
  let form = new formidable.IncomingForm()

  function getImgUrl(ctx) {
    return new Promise((resolve, reject) => {
      form.parse(ctx.req, function (err, fields, files) {
        if (err) {
          console.log(err)
          reject(err)
        }
        // console.log(files)
        let lastItem = files[Object.keys(files)[Object.keys(files).length - 1]]

        // 获取文件后缀名
        let extname = Date.now() + path.extname(lastItem.name)
        let oldUrl = lastItem.path
        let newUrl = './public/public/' + extname

        // 文件重命名，上传到服务器
        let readStream = fs.createReadStream(oldUrl)
        let writeStream = fs.createWriteStream(newUrl)
        readStream.pipe(writeStream)
        let imgUrl = domain + '/public/' + extname
        resolve(imgUrl)
      })
    })
  }

  await getImgUrl(ctx).then((url) => {
    ctx.body = url
  })
}

