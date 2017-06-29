let md5 = require('./md5.js');
let db = require('./db.js');
let formidable = require('formidable');
let fs = require('fs');
let path = require('path');

// 登陆逻辑
exports.login = function(req, res, next) {

  let form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    let username = fields.user;
    let password = fields.pass;
    password = md5(password);

    // 根据用户名查询数据库
    db.find('users', { "query": { "user": username } }, function(err, result) {
      if (err) {
        res.send('-1'); // 内部服务器错误
        return;
      }
      if (result.length === 0) {
        res.send('-2'); //找不到用户名
        return;
      }
      // console.log(result);
      let dbPassword = result[0].pass;
      if (dbPassword === password) {
        localStorage.setItem('token', username);
        res.send('1'); //登录成功
        return;
      } else {
        res.send('-3'); //密码错误
        return;
      }
    })
  });
}


exports.publish = function(req, res, next) {
  if (localStorage.getItem('token') === null) {
    res.send('-4'); //没有登录
    return;
  }

  let username = localStorage.getItem('token');
  // 获取内容
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    let title = fields.title + parseInt(Math.random() * 100);
    let content = fields.content;
    let tag;
    if (fields.tag[0] === '') {
      tag = ['default']
    } else {
      tag = fields.tag;
    }
    let state = fields.state;
    // 插入到数据库
    db.insertOne('infos', {
      "user": username,
      "title": title,
      "content": content,
      "tag": tag,
      "state": state,
      "date": 1504281600000 + parseInt(Math.random() * 100)
    }, function(err, result) {
      if (err) {
        // console.log(err)
        res.send('-5'); //发布失败
        return;
      }
      if (state === 'draft') {
        res.send('2'); // 草稿保存成功
        return;
      }
      res.send('3'); // 发布成功
      return;
    })
  })
}

exports.archive = function(req, res, next) {
  // 归档信息
  db.find('infos', { "query": { "state": "publish" } }, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ "result": [] })
      return;
    }
    // console.log(result[10])
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
    res.json({ "result": arr2 })
  })

}

exports.byarchive = function(req, res, next) {
  // 归档文章
  let limit = Number(req.query.limit); // 每页多少条
  let page = Number(req.query.page); // 分页
  let sortInfo = Number(req.query.sort) || -1; // 按最新发布
  let sort = { "date": sortInfo }; // 按最新发布排序

  let year = req.query.date.slice(0, 4);
  let samllMonth = req.query.date.slice(4) - 1;
  let bigMonth = req.query.date.slice(4);
  let smallDate = new Date(+year, +samllMonth).getTime() //6月1号
  let bigDate = new Date(+year, +bigMonth).getTime() // 7月1号
    // smallDate <= datetime < bigDate
  db.find('infos', { "query": { "state": "publish", "date": { $lt: bigDate, $gte: smallDate } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ "result": [] })
      return;
    }
    db.find('infos', { "query": { "state": "publish", "date": { $lt: bigDate, $gte: smallDate } } }, function(err, result2) {
      result2 = { "result": result, "number": result2.length }
      res.json(result2)
    })
  })
}

// 获取某个用户的发布 默认显示所有发布
exports.people = function(req, res, next) {
  /*let username = req.query.username || false;
  let query = { "user": username };
  for (let key in query) {
    if (!query[key]) {
      delete query[key]
    }
  }*/

  let limit = Number(req.query.limit); // 每页多少条
  let page = Number(req.query.page); // 分页
  let sortInfo = Number(req.query.sort) || -1; // 按最新发布
  let sort = { "date": sortInfo }; // 按最新发布排序
  db.find('infos', { "query": { "state": "publish" }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      res.json({ "result": [] });
      return;
    }
    db.find('infos', { "query": { "state": "publish" } }, function(err, result2) {
      if (err) {
        res.json({ "result": [] });
        return;
      }
      result2 = { "result": result, "number": result2.length }
      res.json(result2)
    })
  })
}

// 获取管理员信息
exports.userinfo = function(req, res, next) {

  db.find('users', { "query": {} }, function(err, result) {
    if (err) {
      // console.log(err)
      res.json({ "result": [] });
      return;
    }
    for (let i = 0; i < result.length; i++) {
      delete result[i].pass
    }

    res.json({ "result": result })
  })
}

// 获取标签
exports.tag = function(req, res, next) {
  db.find('infos', { "query": { "state": "publish" } }, function(err, result) {
    if (err) {
      console.log(err);
      res.json({ "result": [] })
      return;
    }
    // console.log(result[10])
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
    res.json({ "result": arr2 })
  })
}

// 根据标签获取文章
exports.bytag = function(req, res, next) {
  let tag = [];
  if (req.query.tag) {
    tag.push(req.query.tag)
  }
  let limit = Number(req.query.limit); // 每页多少条
  let page = Number(req.query.page); // 分页
  let sortInfo = Number(req.query.sort) || -1; // 按最新发布
  let sort = { "date": sortInfo }; // 按最新发布排序
  db.find('infos', { "query": { "state": "publish", "tag": { $all: tag } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      res.json({ "result": [] });
      return;
    }
    db.find('infos', { "query": { "state": "publish", "tag": { $all: tag } } }, function(err, result2) {
      if (err) {
        res.json({ "result": [] });
        return;
      }
      result2 = { "result": result, "number": result2.length }
      res.json(result2)
    })
  })
}

// 模糊搜索
exports.search = function(req, res, next) {
  let info;
  if (req.query.info) {
    info = req.query.info
  } else {
    info = ''
  }
  let limit = Number(req.query.limit); // 每页多少条
  let page = Number(req.query.page); // 分页
  let sortInfo = Number(req.query.sort) || -1; // 按最新发布
  let sort = { "date": sortInfo }; // 按最新发布排序
  db.find('infos', { "query": { "state": "publish", "title": { $regex: ".*" + info + ".*" } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      res.json({ "result": [] });
      return;
    }
    db.find('infos', { "query": { "state": "publish", "title": { $regex: ".*" + info + ".*" } } }, function(err, result2) {
      if (err) {
        res.json({ "result": [] });
        return;
      }
      result2 = { "result": result, "number": result2.length }
      res.json(result2)
    })
  })
}

/* 文章按照日期查询数据库 */
exports.article = function(req, res, next) {
  let articleID = Number(req.query.id) || false;
  let query = { "date": articleID };
  for (let key in query) {
    if (!query[key]) {
      delete query[key]
    }
  }
  db.find('infos', { "query": query }, function(err, result) {
    if (err) {
      res.json({ "result": [] });
      return;
    }
    res.json({ "result": result })
  })
}

// 后台数据
exports.allarticle = function(req, res, next) {
  let limit = Number(req.query.limit); // 每页多少条
  let page = Number(req.query.page); // 分页
  let sortInfo = Number(req.query.sort) || -1; // 按最新发布
  let sort = { "date": sortInfo }; // 按最新发布排序
  db.find('infos', { "query": {}, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      res.json({ "result": [] });
      return;
    }
    db.find('infos', { "query": {} }, function(err, result2) {
      if (err) {
        res.json({ "result": [] });
        return;
      }
      result2 = { "result": result, "number": result2.length }
      res.json(result2)
    })
  })
}

// 删除文章
exports.delete  = function(req,res,next) {
  var id = Number(req.query.id) || ''; 
  db.deleteMany('infos',{date:id},function(err,result){
    if(err){
      console.log(err);
      return;
    }
    res.send('4')
  })
} 

// 个人信息更新
exports.updateadmin = function(req,res,next){
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    let newJson = fields.new;
    let oldJson = fields.old;
    db.updateMany('users',oldJson,newJson,function(err,result){
      if(err) {
        res.send('-6');
        return;
      }
      res.send('5');
    })
  })
}