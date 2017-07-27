const md5 = require('./md5.js');
const db = require('./db.js');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken')

exports.posts = function(req, res, next) {

  let limit = Number(req.query.limit);
  let page = Number(req.query.page);
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish" }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      res.json({
        "code": 404,
        "message": "数据查询失败",
        "result": []
      });
      return;
    }
    db.find('infos', { "query": { "state": "publish" } }, function(err, result2) {
      if (err) {
        res.json({
          "code": 404,
          "message": "数据获取失败",
          "result": []
        });
        return;
      }

      result2 = {
        "code": 200,
        "message": "数据获取成功",
        "result": result,
        "total": result2.length
      }
      res.json(result2)
    })
  })
}

exports.admin = function(req, res, next) {
  let path = req.protocol + '://' + req.headers.host + '/public/'
  db.find('users', { "query": {} }, function(err, result) {
    if (err) {
      res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      });
      return;
    }
    for (let i = 0; i < result.length; i++) {
      delete result[i].pass
      result[i].avatar = path + result[i].avatar
    }

    res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": result
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
      res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      });
      return;
    }

    res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": result
    })
  })
}

exports.tags = function(req, res, next) {
  db.find('infos', { "query": { "state": "publish" } }, function(err, result) {
    if (err) {
      res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      });
      return;
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
    res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": arr2
    })
  })
}

exports.tag = function(req, res, next) {
  let tag = [];
  if (req.query.tag) {
    tag.push(decodeURI(req.query.tag))
  }
  let limit = Number(req.query.limit);
  let page = Number(req.query.page);
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish", "tag": { $all: tag } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      res.json({
        "code": 404,
        "message": "数据查询失败",
        "result": []
      });
      return;
    }

    db.find('infos', { "query": { "state": "publish", "tag": { $all: tag } } }, function(err, result2) {
      if (err) {
        res.json({
          "code": 404,
          "message": "数据获取失败",
          "result": []
        });
        return;
      }

      result2 = {
        "code": 200,
        "message": "数据获取成功",
        "result": result,
        "total": result2.length
      }
      res.json(result2)
    })
  })
}

exports.search = function(req, res, next) {
  let q;
  if (req.query.q) {
    q = req.query.q
  } else {
    q = ''
  }
  let limit = Number(req.query.limit);
  let page = Number(req.query.page);
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish", "title": { $regex: ".*" + q + ".*" } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      res.json({
        "code": 404,
        "message": "数据查询失败",
        "result": []
      });
      return;
    }

    db.find('infos', { "query": { "state": "publish", "title": { $regex: ".*" + q + ".*" } } }, function(err, result2) {
      if (err) {
        res.json({
          "code": 404,
          "message": "数据获取失败",
          "result": []
        });
        return;
      }

      result2 = {
        "code": 200,
        "message": "数据获取成功",
        "result": result,
        "total": result2.length
      }
      res.json(result2)
    })
  })
}

exports.archives = function(req, res, next) {
  db.find('infos', { "query": { "state": "publish" } }, function(err, result) {
    if (err) {
      res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      });
      return;
    }

    let arr = [],
      arr2 = [];

    for (let i = 0; i < result.length; i++) {
      let year = new Date(result[i].date).getFullYear()
      let month = new Date(result[i].date).getMonth() + 1
      let date = `${year}年${month}月`;
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
    res.json({
      "code": 200,
      "message": "数据获取成功",
      "result": arr2
    })
  })
}

exports.archive = function(req, res, next) {
  let limit = Number(req.query.limit);
  let page = Number(req.query.page);
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };

  let year = req.query.date.slice(0, 4);
  let samllMonth = req.query.date.slice(4) - 1;
  let bigMonth = req.query.date.slice(4);
  let smallDate = new Date(+year, +samllMonth).getTime();
  let bigDate = new Date(+year, +bigMonth).getTime();
  db.find('infos', { "query": { "state": "publish", "date": { $lt: bigDate, $gte: smallDate } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {

      res.json({
        "code": 404,
        "message": "数据获取失败",
        "result": []
      });
      return;
    }
    db.find('infos', { "query": { "state": "publish", "date": { $lt: bigDate, $gte: smallDate } } }, function(err, result2) {
      result2 = {
        "code": 200,
        "message": "数据获取成功",
        "result": result,
        "total": result2.length
      }
      res.json(result2)
    })
  })
}

exports.articles = function(req, res, next) {
  let limit = Number(req.query.limit);
  let page = Number(req.query.page);
  let sortInfo = Number(req.query.sort) || -1;
  let sort = { "date": sortInfo };
  db.find('infos', { "query": {}, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      res.json({
        "code": 404,
        "message": "数据查询失败",
        "result": []
      });
      return;
    }

    db.find('infos', { "query": {} }, function(err, result2) {
      if (err) {
        res.json({
          "code": 404,
          "message": "数据获取失败",
          "result": []
        });
        return;
      }

      result2 = {
        "code": 200,
        "message": "数据获取成功",
        "result": result,
        "total": result2.length
      }
      res.json(result2)
    })
  })
}

exports.article = function(req, res, next) {
  if (!req.cookies.username) {
    res.json({
      "code": 401,
      "message": "请登录后操作"
    })
    return;
  }

  let username = req.cookies.username
  // 获取内容
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {

    let title = fields.title;
    let content = fields.content;
    let tag;
    let date = fields.date;
    // 默认标签
    if (fields.tag[0] === '') {
      tag = ['default']
    } else {
      tag = fields.tag;
    }
    let state = fields.state;
    let newData = {
      "user": username,
      "title": title,
      "content": content,
      "tag": tag,
      "state": state,
      "date": date
    };

    db.find('infos', { "query": { "date": date } }, function(err, result) {
      if (err) {
        res.json({
          "code": 500,
          "message": "内部服务器错误"
        });
        return;
      }

      if (result.length === 1) {
        db.updateMany('infos', { "date": date }, newData, function(err, result2) {
          if (err) {
            res.json({
              "code": 401,
              "message": "文章更新失败"
            });
            return;
          }

          res.json({
            "code": 200,
            "message": "文章更新成功"
          });
          return;
        })
      } else {
        // 插入到数据库
        db.insertOne('infos', newData, function(err, result3) {
          if (err) {
            res.json({
              "code": 401,
              "message": "文章发布失败"
            });
            return;
          }

          if (state === 'draft') {
            res.json({
              "code": 200,
              "message": "草稿保存草稿"
            });
            return;
          }
          res.json({
            "code": 200,
            "message": "文章发布成功"
          });
          return;
        })
      }
    })
  })
}

exports.login = function(req, res, next) {

  let form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    let username = fields.user;
    let password = fields.pass;
    password = md5(password);

    // 根据用户名查询数据库
    db.find('users', { "query": { "user": username } }, function(err, result) {
      if (err) {
        res.json({
          "code": 500,
          "message": "内部服务器错误"
        });
        return;
      }

      if (result.length === 0) {
        res.json({
          "code": 401,
          "message": "找不到用户名"
        });
        return;
      }

      // console.log(result);
      let dbPassword = result[0].pass;
      if (dbPassword === password) {
        let token = jwt.sign({ username }, 'vueblog', { expiresIn: 60 * 60 * 24 * 30 })
        res.cookie('token', token, { maxAge: 60 * 60 * 24 * 30 * 1000 })
        res.cookie('username', username, { maxAge: 60 * 60 * 24 * 30 * 1000 })
        res.json({
          "code": 200,
          "message": "登录成功"
        });
        return;
      } else {
        res.json({
          "code": 401,
          "message": "密码错误"
        });
        return;
      }
    })
  })
}

exports.logout = function(req, res, next) {
  res.cookie('token', '', { maxAge: 0 })
  res.cookie('username', '', { maxAge: 0 })
  res.json({
    "code": 200,
    "message": "退出成功"
  });
  return;
}

exports.updateAdminInfo = function(req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    let newJson = fields.new;
    let oldJson = fields.old;
    db.updateMany('users', oldJson, newJson, function(err, result) {
      if (err) {
        res.json({
          "code": 401,
          "message": "信息修改失败"
        })
        return;
      }

      res.json({
        "code": 200,
        "message": "信息修改成功"
      })
    })
  })
}

exports.avatar = function(req, res, next) {
  if (!req.cookies.username) {
    res.json({
      "code": 401,
      "message": "请登录后操作"
    })
    return
  }

  let username = req.cookies.username;

  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.json({
        "code": 500,
        "message": "内部服务器错误"
      })
      return
    }

    // 限制文件大小 单位默认字节 这里限制大小为1m
    if (files.avatar.size / 1024 > 1024) {
      res.json({
        "code": 401,
        "message": "图片应小于1M"
      })
      fs.unlink(files.avatar.path)
      return
    }
    // 获取后缀名
    let extname = path.extname(files.avatar.name);
    let oldpath = files.avatar.path;
    let newpath = './public/avatar' + extname;
    let avatarName = 'avatar' + extname;
    // 更改名字和路径
    fs.rename(oldpath, newpath, function(err) {
      if (err) {
        res.json({
          "code": 401,
          "message": "图片上传失败"
        })
        return
      }
    })

    db.updateMany('users', { "user": username }, { "avatar": avatarName },
      function(err, result) {
        if (err) {
          res.json({
            "code": 401,
            "message": "头像更新失败"
          })
          return
        }
        res.redirect('/updateAdminInfo')
      })
  })
}

exports.updateAdminPassword = function(req, res, next) {
  if (!req.cookies.username) {
    res.json({
      "code": 401,
      "message": "请登录后操作"
    })
    return
  }
  let username = req.cookies.username;

  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    let oldPass = md5(fields.oldPass);
    let newPass = md5(fields.pass);
    db.find('users', { "query": { "user": username } }, function(err, result) {
      if (oldPass !== result[0].pass) {
        res.json({
          "code": 403,
          "message": "密码输入有误"
        })
        return;
      }

      db.updateMany('users', { "user": username }, { "pass": newPass }, function(err, result2) {
        if (err) {
          res.json({
            "code": 401,
            "message": "密码修改失败"
          })
          return;
        }

        res.json({
          "code": 200,
          "message": "密码修改成功"
        })
        return;
      })
    })


  })
}

exports.deleteArticle = function(req, res, next) {
  let id = Number(req.query.id) || '';
  db.deleteMany('infos', { date: id }, function(err, result) {
    if (err) {
      res.json({
        "code": 401,
        "message": "文章删除失败"
      })
      return;
    }

    res.json({
      "code": 200,
      "message": "文章删除成功"
    })
  })
}
