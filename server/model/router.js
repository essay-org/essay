const md5 = require('./md5.js')
const db = require('./db.js')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

exports.posts = function(req, res, next) {
  let limit = Number(req.query.limit)
  let page = Number(req.query.page)
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish" }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 404,
        message: "数据查询失败",
        result: []
      })
    }
    db.find('infos', { "query": { "state": "publish" } }, function(err, result2) {
      if (err) {
        console.log(err)
        return res.json({
          code: 404,
          message: "数据获取失败",
          result: []
        })
      }

      result2 = {
        code: 200,
        message: "数据获取成功",
        result: result,
        total: result2.length
      }
      return res.json(result2)
    })
  })
}

exports.admin = function(req, res, next) {
  let path = req.protocol + '://' + req.headers.host + '/public/avatars/'
  db.find('users', {}, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 404,
        message: "数据获取失败",
        result: {}
      })
    }

    delete result[0].pass
    delete result[0]._id
    delete result[0].lastModified
    result[0].avatar = path + result[0].avatar

    return res.json({
      code: 200,
      message: "数据获取成功",
      result: result[0]
    })
  })
}

exports.getArticle = function(req, res, next) {
  let articleID = Number(req.query.id) || false;
  let query = { "date": articleID };
  for (let key in query) {
    if (!query[key]) {
      delete query[key]
    }
  }

  db.find('infos', { "query": query }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 404,
        message: "数据获取失败",
        result: {}
      })
    }

    return res.json({
      code: 200,
      message: "数据获取成功",
      result: result[0]
    })
  })
}

exports.tags = function(req, res, next) {
  db.find('infos', { "query": { "state": "publish" } }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 404,
        message: "数据获取失败",
        result: []
      })
    }

    let arr = [],
      arr2 = [];
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[i].tag.length; j++) {
        arr.push(result[i].tag[j])
      }
    }

    arr.sort()
    for (let i = 0; i < arr.length;) {
      let count = 0;
      for (let j = i; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          count++;
        }
      }
      arr2.push({
        tag: arr[i],
        count: count
      })
      i += count;
    }

    arr2.reverse()
    return res.json({
      code: 200,
      message: "数据获取成功",
      result: arr2
    })
  })
}

exports.tag = function(req, res, next) {
  let tag = [];
  if (req.query.tag) {
    tag.push(decodeURI(req.query.tag))
  }
  let limit = Number(req.query.limit)
  let page = Number(req.query.page)
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish", "tag": { $all: tag } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 404,
        message: "数据查询失败",
        result: []
      })
    }

    db.find('infos', { "query": { "state": "publish", "tag": { $all: tag } } }, function(err, result2) {
      if (err) {
        console.log(err)
        return res.json({
          code: 404,
          message: "数据获取失败",
          result: []
        })
      }

      result2 = {
        code: 200,
        message: "数据获取成功",
        result: result,
        total: result2.length
      }
      return res.json(result2)
    })
  })
}

exports.search = function(req, res, next) {
  let q = req.query.q ? decodeURI(req.query.q) : ''
  let limit = Number(req.query.limit)
  let page = Number(req.query.page)
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish", "title": { $regex: ".*" + q + ".*" } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 404,
        message: "数据查询失败",
        result: []
      })
    }

    db.find('infos', { "query": { "state": "publish", "title": { $regex: ".*" + q + ".*" } } }, function(err, result2) {
      if (err) {
        console.log(err)
        return res.json({
          code: 404,
          message: "数据获取失败",
          result: []
        })
      }

      result2 = {
        code: 200,
        message: "数据获取成功",
        result: result,
        total: result2.length
      }
      res.json(result2)
    })
  })
}

exports.archives = function(req, res, next) {
  db.find('infos', { "query": { "state": "publish" } }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 404,
        message: "数据获取失败",
        result: []
      })
    }

    let arr = [],
      arr2 = [];

    for (let i = 0; i < result.length; i++) {
      let year = new Date(result[i].date).getFullYear() + ''
      let month = new Date(result[i].date).getMonth() + 1 + ''
      if (month.length === 1) {
        month = '0' + month;
      }
      // let date = `${year}年${month}月`;
      let date = `${year}${month}`;
      arr.push(date)
    }

    arr.sort()
    for (let i = 0; i < arr.length;) {
      let count = 0;
      for (let j = i; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          count++;
        }
      }
      arr2.push({
        date: arr[i],
        count: count
      })
      i += count;
    }

    arr2.reverse()
    return res.json({
      code: 200,
      message: "数据获取成功",
      result: arr2
    })
  })
}

exports.archive = function(req, res, next) {
  let limit = Number(req.query.limit)
  let page = Number(req.query.page)
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };

  let year = req.query.date.slice(0, 4)
  let samllMonth = req.query.date.slice(4) - 1;
  let bigMonth = req.query.date.slice(4)
  let smallDate = new Date(+year, +samllMonth).getTime()
  let bigDate = new Date(+year, +bigMonth).getTime()
  db.find('infos', { "query": { "state": "publish", "date": { $lt: bigDate, $gte: smallDate } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 404,
        message: "数据获取失败",
        result: []
      })
    }
    db.find('infos', { "query": { "state": "publish", "date": { $lt: bigDate, $gte: smallDate } } }, function(err, result2) {
      result2 = {
        code: 200,
        message: "数据获取成功",
        result: result,
        total: result2.length
      }
      return res.json(result2)
    })
  })
}

exports.articles = function(req, res, next) {
  let limit = Number(req.query.limit)
  let page = Number(req.query.page)
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": {}, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 404,
        message: "数据查询失败",
        result: []
      })
    }

    db.find('infos', { "query": {} }, function(err, result2) {
      if (err) {
        console.log(err)
        return res.json({
          code: 404,
          message: "数据获取失败",
          result: []
        })
      }

      result2 = {
        code: 200,
        message: "数据获取成功",
        result: result,
        total: result2.length
      }
      return res.json(result2)
    })
  })
}

exports.avatar = function(req, res, next) {
  const clientToken = req.headers.token
  const decoded = jwt.verify(clientToken, 'vueblog');
  const username = decoded.username

  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err)
      return res.json({
        code: 500,
        message: "内部服务器错误"
      })
    }

    // 限制头像大小 单位默认字节 这里限制大小为1m
    if (files.avatar.size / 1024 > 1024) {
      fs.unlink(files.avatar.path)
      return res.json({
        code: 401,
        message: "图片应小于1M"
      })
    }
    // 获取后缀名
    let extname = path.extname(files.avatar.name)
    let oldUrl = files.avatar.path;
    let newUrl = './public/avatars/avatar' + extname;
    let avatarName = 'avatar' + extname;

    // 头像上传到服务器
    let readStream = fs.createReadStream(oldUrl)
    let writeStream = fs.createWriteStream(newUrl)
    readStream.pipe(writeStream)
    readStream.on('end', function() {
      // 更新数据库中头像的链接信息
      db.updateMany('users', { "user": username }, { "avatar": avatarName },
        function(err, result) {
          if (err) {
            console.log(err)
            return res.json({
              code: 401,
              message: "头像更新失败"
            })
          }
          return res.json({
            code: 200,
            message: "头像上传成功"
          })
        })
    })
  })
}

exports.upload = function(req, res, next) {
  const clientToken = req.headers.token
  const decoded = jwt.verify(clientToken, 'vueblog');
  const username = decoded.username

  let form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err)
      return res.json({
        code: 401,
        message: "表单解析错误"
      })
    }
    // console.log(files)
    // 获取对象的最后一项
    let lastItem = files[Object.keys(files)[Object.keys(files).length - 1]]

    // 获取后缀名
    let extname = Date.now() + path.extname(lastItem.name)
    let oldUrl = lastItem.path
    let newUrl = './public/pictures/' + extname
    let imgUrl = req.protocol + '://' + req.headers.host + '/public/pictures/' + extname

    // 更改名字和路径,实现上传
    let readStream = fs.createReadStream(oldUrl)
    let writeStream = fs.createWriteStream(newUrl)
    readStream.pipe(writeStream)
    readStream.on('end', function() {
      return res.send(imgUrl)
    })
  })
}

exports.deleteArticle = function(req, res, next) {
  let id = Number(req.query.id) || ''
  db.deleteMany('infos', { date: id }, function(err, result) {
    if (err) {
      console.log(err)
      return res.json({
        code: 401,
        message: "文章删除失败"
      })
    }

    return res.json({
      code: 200,
      message: "文章删除成功"
    })
  })
}

exports.noData = function(req, res, next) {
  return res.json({
    code: 404,
    message: '数据获取失败'
  })
}