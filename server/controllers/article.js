import mongoose from 'mongoose'
import path from 'path'
import os from 'os'
import fs from 'fs'
import formidable from 'formidable'
const Article = mongoose.model('Article')

export const getArticles = async(ctx, next) => {
  let { page = 1, limit = 15 } = ctx.params
  page = Number((page - 1) * limit) || 0
  limit = Number(limit) || 15

  try {
    let total = await Article.find({ publish: true }).exec()
    total = total.length
    const data = await Article.find({ publish: true })
      .populate({
        path: 'tags',
        select: 'id name'
      })
      .skip(page)
      .limit(limit)
      .sort({'createdAt': -1})
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

export const getPrivateArticles = async(ctx, next) => {
  const data = await Article.find({ publish: false })
    .populate({
      path: 'tags',
      select: 'id name'
    })
    .sort({'updatedAt': -1})
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
      .exec()
      await Article.findByIdAndUpdate(id, {views: article.views + 1}).exec()
    ctx.body = {
      success: true,
      data: article
    }
  } catch (e) {
    // console.log(e)
    ctx.body = {
      success: false,
      err: e
    }
  }
}

export const postArticle = async(ctx, next) => {
  let body = ctx.request.body
  let { title, content, publish } = body
  if (!title || !content || !String(publish)) {
    return (ctx.body = {
      success: false,
      err: 'Field incomplete'
    })
  }

  try {
    body = await new Article(body)
    await body.save()
    // when save article, we can replace id to object
    // await body.populate('tags').execPopulate()
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

// modify publish article or private article
export const patchArticle = async(ctx, next) => {
  let body = ctx.request.body
  body.updatedAt = Date.now()
  let { id, title, content, publish } = body
  if (!id || !title || !content || !String(publish)) {
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

export const search = async(ctx, next) => {
  const { keyword } = ctx.params
  const reg = new RegExp(keyword, 'i');
  try {
    let body = await Article.find({
      publish: true,
      $or: [{ title: { $regex: reg } }]
    })
    .sort({'createdAt': -1})
    .exec()
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

export const archives = async(ctx, next) => {
  let articles = await Article.find({ publish: true })
    .populate({
      path: 'tags',
      select: 'id name'
    })
    .select('id title tags createdAt updatedAt')
    .sort({'createdAt': -1})
    .exec()
  let arr = [],
    arr2 = [],
    year, month, date
  for (let i = 0; i < articles.length; i++) {
    year = new Date(articles[i].createdAt).getFullYear() + ''
    month = new Date(articles[i].createdAt).getMonth() + 1 + ''
    if (month.length === 1) {
      month = '0' + month;
    }
    date = `${year}年${month}月`
    arr.push({
      date: date,
      article: articles[i]
    })
  }

  for (let i = 0; i < arr.length;) {
    let total = 0,
      archiveArticles = [];
    for (let j = i; j < arr.length; j++) {
      if (arr[i].date === arr[j].date) {
        archiveArticles.push(arr[j].article)
        total++
      }
    }
    arr2.push({
      date: arr[i].date,
      articles: archiveArticles,
      total: total
    })
    i += total
  }

  ctx.body = {
    success: true,
    data: arr2
  }
}

export const upload = async(ctx, next) => {

  let form = new formidable.IncomingForm()

  function getImgUrl(ctx) {
    return new Promise((resolve, reject) => {
      form.parse(ctx.req, function(err, fields, files) {
        if (err) {
          console.log(err)
          reject(err)
        }
        // console.log(files)
        let lastItem = files[Object.keys(files)[Object.keys(files).length - 1]]

        // fetch file extname
        let extname = Date.now() + path.extname(lastItem.name)
        let oldUrl = lastItem.path
        let newUrl = './public/' + extname

        // modify file name and upload file
        let readStream = fs.createReadStream(oldUrl)
        let writeStream = fs.createWriteStream(newUrl)
        readStream.pipe(writeStream)
        let imgUrl = ctx.protocol + '://' + ctx.host + '/public/' + extname
        resolve(imgUrl)
      })
    })
  }

  await getImgUrl(ctx).then((url) => {
    ctx.body = url
  })
}
