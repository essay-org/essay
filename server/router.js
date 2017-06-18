var md5 = require('./md5.js');
var db = require('./db.js');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

// 登陆逻辑
exports.login = function(req, res, next) {

  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    var username = fields.user;
    var password = fields.pass;
    password = md5(password);

    // 根据用户名查询数据库
    db.find('users', { "query": { "user": username } }, function(err, result) {
      if (err) {
        res.send('-3');// 内部服务器错误
        return;
      }
      if (result.length === 0) {
        res.send('-2'); //找不到用户名
        return;
      }
      // console.log(result);
      var dbPassword = result[0].pass;
      if (dbPassword === password) {
        localStorage.setItem('token', username);
        res.send('1'); //登录成功
        return;
      } else {
        res.send('-1'); //密码错误
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

  var username = localStorage.getItem('token');
  // 获取内容
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var title = fields.title + parseInt(Math.random() * 100);
    var content = fields.content;
    var tag = fields.tag;
    // 插入到数据库
    db.insertOne('infos', {
      "user": username,
      "title": title,
      "content": content,
      "tag": tag,
      "date": Date.now()
    }, function(err, result) {
      if (err) {
        // console.log(err)
        res.send('-5'); //发布失败
        return;
      }
      res.send('2'); // 发布成功
      return;
    })
    // 标签更新处理
    // 思路：先查询，再合并数组去重，再更新
    var tags = [];
    db.find('tags',{},function(err,result){
      if(err){
        // console.log(err);
        return;
      }
      if(!result.length){
        // 第一次插入操作
        tags = tag;
        db.insertOne('tags',{"tags":tags},function(err){
          if(err){
            console.log(err)
          }
        })
      }else{
        var newTags = [],getTags=[];
        tags = result[0].tags;
        newTags = tags.concat(tag)
        // 去重
        for (var i = 0; i < newTags.length; i++) {
          if(getTags.indexOf(newTags[i]) === -1){
            getTags.push(newTags[i])
          }          
        }
        // 更新
        db.updateMany('tags',{"tags":tags},{"tags":getTags},function(err,result){
          if(err){
            console.log(err)
          }
        })
      }
      
    })
  })
}

// 获取某个用户的发布 默认显示所有发布
exports.people = function(req, res, next) {
  /*var username = req.query.username || false;
  var query = { "user": username };
  for (var key in query) {
    if (!query[key]) {
      delete query[key]
    }
  }*/

  var limit = Number(req.query.limit); // 每页多少条
  var page = Number(req.query.page); // 分页
  var sortInfo = Number(req.query.sort) || -1; // 按最新发布
  var sort = { "date": sortInfo }; // 按最新发布排序
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

// 获取管理员信息
exports.userinfo = function(req, res, next) {

  db.find('users', { "query": {} }, function(err, result) {
    if (err) {
      // console.log(err)
      res.json({ "result": [] });
      return;
    }
    for (var i = 0; i < result.length; i++) {
      delete result[i].pass
    }

    res.json({ "result": result })
  })
}

// 获取标签
exports.tag = function(req, res, next) {

  db.find('tags', { "query": {} }, function(err, result) {
    if (err) {
      // console.log(err)
      res.json({ "result": [] });
      return;
    }

    res.json({ "result": result })
  })
}

// 根据标签获取文章
exports.bytag = function(req, res, next) {
  var tag = [];
  if(req.query.tag){
    tag.push(req.query.tag)
  }
  var limit = Number(req.query.limit); // 每页多少条
  var page = Number(req.query.page); // 分页
  var sortInfo = Number(req.query.sort) || -1; // 按最新发布
  var sort = { "date": sortInfo }; // 按最新发布排序
  db.find('infos', { "query": { tag: { $all: tag } }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      res.json({ "result": [] });
      return;
    }
    db.find('infos', { "query": { tag: { $all: tag } } }, function(err, result2) {
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
  var info;
  if(req.query.info){
    info = req.query.info
  }else{
    info = ''
  }
  var limit = Number(req.query.limit); // 每页多少条
  var page = Number(req.query.page); // 分页
  var sortInfo = Number(req.query.sort) || -1; // 按最新发布
  var sort = { "date": sortInfo }; // 按最新发布排序
  db.find('infos', { "query": { title: {$regex : ".*"+info+".*"} }, "limit": limit, "page": page, "sort": sort }, function(err, result) {
    if (err) {
      res.json({ "result": [] });
      return;
    }
    db.find('infos', { "query": { title: {$regex : ".*"+info+".*"} }}, function(err, result2) {
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
  var articleID = Number(req.query.id) || false;
  var query = { "date": articleID };
  for (var key in query) {
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
