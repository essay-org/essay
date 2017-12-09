require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var crypto = __webpack_require__(11);
module.exports = function (content) {
    var md5 = crypto.createHash('md5');
    var newContent = md5.update(content).digest('base64');
    return newContent;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var MongoClient = __webpack_require__(12).MongoClient;
var settings = __webpack_require__(13);
// 链接数据库 如果没有自动创建
function _connectDB(callback) {
  var url = settings.dbUrl;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      callback(err, null);
      return;
    }
    // 数据库链接成功执行回掉
    callback(err, db);
  });
}

(function init() {
  var user = settings.user,
      pass = settings.pass,
      nickname = settings.nickname || '暂无昵称';
  avatar = settings.avatar || '', intro = settings.intro || '暂无介绍';
  var json = { "user": user, "pass": pass, "avatar": avatar, "intro": intro, "nickname": nickname };
  _connectDB(function (err, db) {
    var usersCollection = db.collection('users');
    usersCollection.find({ "user": user }).toArray(function (err, result) {
      if (err) {
        console.log('查询管理员失败');
        db.close;
        return;
      }
      if (result.length !== 0) {
        db.close();
        return;
        // usersCollection.deleteMany({ "user": user })
      }
      usersCollection.insertOne(json, function (err, res) {
        if (err) {
          console.log('管理员信息初始化失败');
          db.close();
          return;
        }
        console.log('管理员信息初始化成功');
        db.close();
      });
    });
  });
})();

// 插入数据
exports.insertOne = function (collectionName, json, callback) {
  _connectDB(function (err, db) {
    db.collection(collectionName).insertOne(json, function (err, result) {
      if (err) {
        callback(err, null);
        db.close();
        return;
      }
      callback(err, result);
      db.close();
    });
  });
};

// 查找数据
exports.find = function (collectionName, queryJson, callback) {
  _connectDB(function (err, db) {
    var json = queryJson.query || {},
        limit = Number(queryJson.limit) || 0,
        count = Number(queryJson.page) - 1,
        sort = queryJson.sort || {};
    // 页数为0或者1都显示前limit条数据
    if (count <= 0) {
      count = 0;
    } else {
      count = count * limit;
    }

    var cursor = db.collection(collectionName).find(json).limit(limit).skip(count).sort(sort);
    cursor.toArray(function (err, results) {
      if (err) {
        callback(err, null);
        db.close();
        return;
      }
      callback(err, results);
      db.close();
    });
  });
};

// 删除数据
exports.deleteMany = function (collectionName, json, callback) {
  _connectDB(function (err, db) {
    db.collection(collectionName).deleteMany(json, function (err, results) {
      if (err) {
        callback(err, null);
        db.close();
        return;
      }
      callback(err, results);
      db.close();
    });
  });
};

// 修改数据
exports.updateMany = function (collectionName, jsonOld, jsonNew, callback) {
  _connectDB(function (err, db) {
    db.collection(collectionName).updateMany(jsonOld, {
      $set: jsonNew,
      $currentDate: { "lastModified": false }
    }, function (err, results) {
      if (err) {
        callback(err, null);
        db.close();
        return;
      }
      callback(err, results);
      db.close();
    });
  });
};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var _require = __webpack_require__(5),
    Nuxt = _require.Nuxt,
    Builder = _require.Builder;

var bodyParser = __webpack_require__(6);
var cookieParser = __webpack_require__(7);
var express = __webpack_require__(8);
var app = express();
var cors = __webpack_require__(9);
var jwt = __webpack_require__(0);
var path = __webpack_require__(3);
var router = __webpack_require__(10);
var hasToken = __webpack_require__(16);
var md5 = __webpack_require__(1);
var db = __webpack_require__(2);
var resolve = function resolve(file) {
  return path.resolve(__dirname, file);
};
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

app.set('port', port);
app.use(bodyParser.json());
app.use(cookieParser());
// 允许跨域
app.use(cors());
// 静态public
app.use('/public', express.static(resolve('../public')));

// 获取已发布文章列表
app.get('/v1/posts', router.posts);

// 获取管理员信息
app.get('/v1/administrator', router.admin);

// 获取文章详情 eg:http://localhost:8080/v1/article?id=1496841740682
app.get('/v1/article', router.getArticle);

// 获取标签列表
app.get('/v1/tags', router.tags);

// 获取某个标签下的文章列表  eg: http://localhost:8080/v1/tag?tag=javascript
app.get('/v1/tag', router.tag);

// 搜索(目前仅支持按标题搜索) eg:http://localhost:8080/v1/search?q=j
app.get('/v1/search', router.search);

// 获取归档列表
app.get('/v1/archives', router.archives);

// 获取某个归档下的文章列表 eg:http://localhost:8080/v1/archive?date=201706
app.get('/v1/archive', router.archive);

// 获取所有文章(包括草稿)
app.get('/v1/articles', hasToken, router.articles);

// 更新管理员头像
app.post('/v1/avatar', hasToken, router.avatar);

// 发布文章时，文章中的图片上传接口
app.post('/v1/upload', hasToken, router.upload);

// 删除文章 eg: http://localhost:8080/v1/article?id=1496841740682
app.delete('/v1/article', hasToken, router.deleteArticle);

/* 
 * 以下是有数据提交的请求 
 * 目前实现的并不优雅，如果你有好的实现的方式，欢迎交流
*/

// 登录
app.post('/v1/login', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  password = md5(password);

  // 根据用户名查询数据库
  db.find('users', { user: username }, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 500,
        message: "内部服务器错误"
      });
    }

    if (result.length === 0) {
      return res.json({
        code: 401,
        message: "找不到用户名"
      });
    }

    // console.log(result)
    var id = result[0]._id;

    if (result[0].user === username && result[0].pass === password) {
      // token包含了用户的名字和唯一id
      var serverToken = jwt.sign({ username: username, userID: id }, 'vueblog');
      // 把token存储到cookie中
      res.cookie('token', serverToken, { maxAge: 60000 * 60 * 24 * 30 });
      return res.json({
        code: 200,
        message: "登录成功",
        token: serverToken
      });
    } else {
      return res.json({
        code: 401,
        message: "密码错误"
      });
    }
  });
});

// 登出
app.post('/v1/logout', function (req, res) {
  res.clearCookie('token');
  res.json({
    code: 200,
    msg: '退出登录'
  });
});

// 发布文章，发布草稿，编辑文章
app.post('/v1/article', hasToken, function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var tag = req.body.tag;
  var date = req.body.date;
  var state = req.body.state;
  var newData = {
    title: title,
    content: content,
    tag: tag,
    state: state,
    date: date
  };

  db.find('infos', { "query": { "date": date } }, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 500,
        message: "内部服务器错误"
      });
    }
    // 能通过发布日期找到文章，说明你编辑了文章
    if (result.length === 1) {
      db.updateMany('infos', { "date": date }, newData, function (err, result2) {
        if (err) {
          console.log(err);
          return res.json({
            code: 401,
            message: "文章更新失败"
          });
        }

        return res.json({
          code: 200,
          message: "文章更新成功"
        });
      });
    } else {
      // 插入到数据库
      db.insertOne('infos', newData, function (err, result3) {
        if (err) {
          console.log(err);
          return res.json({
            code: 401,
            message: "文章发布失败"
          });
        }

        if (state === 'draft') {
          return res.json({
            code: 200,
            message: "草稿保存草稿"
          });
        }
        return res.json({
          code: 200,
          message: "文章发布成功"
        });
      });
    }
  });
});

// 更新管理员信息
app.put('/v1/administrator', hasToken, function (req, res, next) {
  var clientToken = req.headers.token;
  var decoded = jwt.verify(clientToken, 'vueblog');
  var username = decoded.username;
  db.updateMany('users', { user: username }, req.body, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 401,
        message: "信息修改失败"
      });
    }

    return res.json({
      code: 200,
      message: "信息修改成功"
    });
  });
});

// 修改密码
app.put('/v1/password', hasToken, function (req, res, next) {
  var clientToken = req.headers.token;
  var decoded = jwt.verify(clientToken, 'vueblog');
  var username = decoded.username;

  var oldPass = md5(req.body.oldPass);
  var newPass = md5(req.body.newPass);
  db.find('users', {}, function (err, result) {
    if (oldPass !== result[0].pass) {
      return res.json({
        code: 403,
        message: "旧密码输入有误"
      });
    }

    db.updateMany('users', { "user": username }, { "pass": newPass }, function (err, result2) {
      if (err) {
        console.log(err);
        return res.json({
          code: 401,
          message: "密码修改失败"
        });
      }
      return res.json({
        code: 200,
        message: "密码修改成功"
      });
    });
  });
});

// api地址错误处理
app.get('/v1/*', router.noData);
app.post('/v1/*', router.noData);
app.put('/v1/*', router.noData);
app.delete('/v1/*', router.noData);

// Import and Set Nuxt.js options
var config = __webpack_require__(17);
config.dev = !("production" === 'production');

// Init Nuxt.js
var nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  var builder = new Builder(nuxt);
  builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var md5 = __webpack_require__(1);
var db = __webpack_require__(2);
var formidable = __webpack_require__(14);
var fs = __webpack_require__(15);
var path = __webpack_require__(3);
var jwt = __webpack_require__(0);

exports.posts = function (req, res, next) {
  var limit = Number(req.query.limit);
  var page = Number(req.query.page);
  var sortInfo = Number(req.query.sort) || -1;
  var sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish" }, "limit": limit, "page": page, "sort": sort }, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 404,
        message: "数据查询失败",
        result: []
      });
    }
    db.find('infos', { "query": { "state": "publish" } }, function (err, result2) {
      if (err) {
        console.log(err);
        return res.json({
          code: 404,
          message: "数据获取失败",
          result: []
        });
      }

      result2 = {
        code: 200,
        message: "数据获取成功",
        result: result,
        total: result2.length
      };
      return res.json(result2);
    });
  });
};

exports.admin = function (req, res, next) {
  var path = req.protocol + '://' + req.headers.host + '/public/avatars/';
  db.find('users', {}, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 404,
        message: "数据获取失败",
        result: {}
      });
    }

    delete result[0].pass;
    delete result[0]._id;
    delete result[0].lastModified;
    result[0].avatar = path + result[0].avatar;

    return res.json({
      code: 200,
      message: "数据获取成功",
      result: result[0]
    });
  });
};

exports.getArticle = function (req, res, next) {
  var articleID = Number(req.query.id) || false;
  var query = { "date": articleID };
  for (var key in query) {
    if (!query[key]) {
      delete query[key];
    }
  }

  db.find('infos', { "query": query }, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 404,
        message: "数据获取失败",
        result: {}
      });
    }

    return res.json({
      code: 200,
      message: "数据获取成功",
      result: result[0]
    });
  });
};

exports.tags = function (req, res, next) {
  db.find('infos', { "query": { "state": "publish" } }, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 404,
        message: "数据获取失败",
        result: []
      });
    }

    var arr = [],
        arr2 = [];
    for (var i = 0; i < result.length; i++) {
      for (var j = 0; j < result[i].tag.length; j++) {
        arr.push(result[i].tag[j]);
      }
    }

    arr.sort();
    for (var _i = 0; _i < arr.length;) {
      var count = 0;
      for (var _j = _i; _j < arr.length; _j++) {
        if (arr[_i] === arr[_j]) {
          count++;
        }
      }
      arr2.push({
        tag: arr[_i],
        count: count
      });
      _i += count;
    }

    arr2.reverse();
    return res.json({
      code: 200,
      message: "数据获取成功",
      result: arr2
    });
  });
};

exports.tag = function (req, res, next) {
  var tag = [];
  if (req.query.tag) {
    tag.push(decodeURI(req.query.tag));
  }
  var limit = Number(req.query.limit);
  var page = Number(req.query.page);
  var sortInfo = Number(req.query.sort) || -1;
  var sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish", "tag": { $all: tag } }, "limit": limit, "page": page, "sort": sort }, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 404,
        message: "数据查询失败",
        result: []
      });
    }

    db.find('infos', { "query": { "state": "publish", "tag": { $all: tag } } }, function (err, result2) {
      if (err) {
        console.log(err);
        return res.json({
          code: 404,
          message: "数据获取失败",
          result: []
        });
      }

      result2 = {
        code: 200,
        message: "数据获取成功",
        result: result,
        total: result2.length
      };
      return res.json(result2);
    });
  });
};

exports.search = function (req, res, next) {
  var q = req.query.q ? decodeURI(req.query.q) : '';
  var limit = Number(req.query.limit);
  var page = Number(req.query.page);
  var sortInfo = Number(req.query.sort) || -1;
  var sort = { "date": sortInfo };
  db.find('infos', { "query": { "state": "publish", "title": { $regex: ".*" + q + ".*" } }, "limit": limit, "page": page, "sort": sort }, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 404,
        message: "数据查询失败",
        result: []
      });
    }

    db.find('infos', { "query": { "state": "publish", "title": { $regex: ".*" + q + ".*" } } }, function (err, result2) {
      if (err) {
        console.log(err);
        return res.json({
          code: 404,
          message: "数据获取失败",
          result: []
        });
      }

      result2 = {
        code: 200,
        message: "数据获取成功",
        result: result,
        total: result2.length
      };
      res.json(result2);
    });
  });
};

exports.archives = function (req, res, next) {
  db.find('infos', { "query": { "state": "publish" } }, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 404,
        message: "数据获取失败",
        result: []
      });
    }

    var arr = [],
        arr2 = [];

    for (var i = 0; i < result.length; i++) {
      var year = new Date(result[i].date).getFullYear() + '';
      var month = new Date(result[i].date).getMonth() + 1 + '';
      if (month.length === 1) {
        month = '0' + month;
      }
      // let date = `${year}年${month}月`;
      var date = '' + year + month;
      arr.push(date);
    }

    arr.sort();
    for (var _i2 = 0; _i2 < arr.length;) {
      var count = 0;
      for (var j = _i2; j < arr.length; j++) {
        if (arr[_i2] === arr[j]) {
          count++;
        }
      }
      arr2.push({
        date: arr[_i2],
        count: count
      });
      _i2 += count;
    }

    arr2.reverse();
    return res.json({
      code: 200,
      message: "数据获取成功",
      result: arr2
    });
  });
};

exports.archive = function (req, res, next) {
  var limit = Number(req.query.limit);
  var page = Number(req.query.page);
  var sortInfo = Number(req.query.sort) || -1;
  var sort = { "date": sortInfo };

  var year = req.query.date.slice(0, 4);
  var samllMonth = req.query.date.slice(4) - 1;
  var bigMonth = req.query.date.slice(4);
  var smallDate = new Date(+year, +samllMonth).getTime();
  var bigDate = new Date(+year, +bigMonth).getTime();
  db.find('infos', { "query": { "state": "publish", "date": { $lt: bigDate, $gte: smallDate } }, "limit": limit, "page": page, "sort": sort }, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 404,
        message: "数据获取失败",
        result: []
      });
    }
    db.find('infos', { "query": { "state": "publish", "date": { $lt: bigDate, $gte: smallDate } } }, function (err, result2) {
      result2 = {
        code: 200,
        message: "数据获取成功",
        result: result,
        total: result2.length
      };
      return res.json(result2);
    });
  });
};

exports.articles = function (req, res, next) {
  var limit = Number(req.query.limit);
  var page = Number(req.query.page);
  var sortInfo = Number(req.query.sort) || -1;
  var sort = { "date": sortInfo };
  db.find('infos', { "query": {}, "limit": limit, "page": page, "sort": sort }, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 404,
        message: "数据查询失败",
        result: []
      });
    }

    db.find('infos', { "query": {} }, function (err, result2) {
      if (err) {
        console.log(err);
        return res.json({
          code: 404,
          message: "数据获取失败",
          result: []
        });
      }

      result2 = {
        code: 200,
        message: "数据获取成功",
        result: result,
        total: result2.length
      };
      return res.json(result2);
    });
  });
};

exports.avatar = function (req, res, next) {
  var clientToken = req.headers.token;
  var decoded = jwt.verify(clientToken, 'vueblog');
  var username = decoded.username;

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err);
      return res.json({
        code: 500,
        message: "内部服务器错误"
      });
    }

    // 限制头像大小 单位默认字节 这里限制大小为1m
    if (files.avatar.size / 1024 > 1024) {
      fs.unlink(files.avatar.path);
      return res.json({
        code: 401,
        message: "图片应小于1M"
      });
    }
    // 获取后缀名
    var extname = path.extname(files.avatar.name);
    var oldUrl = files.avatar.path;
    var newUrl = './public/avatars/avatar' + extname;
    var avatarName = 'avatar' + extname;

    // 头像上传到服务器
    var readStream = fs.createReadStream(oldUrl);
    var writeStream = fs.createWriteStream(newUrl);
    readStream.pipe(writeStream);
    readStream.on('end', function () {
      // 更新数据库中头像的链接信息
      db.updateMany('users', { "user": username }, { "avatar": avatarName }, function (err, result) {
        if (err) {
          console.log(err);
          return res.json({
            code: 401,
            message: "头像更新失败"
          });
        }
        return res.json({
          code: 200,
          message: "头像上传成功"
        });
      });
    });
  });
};

exports.upload = function (req, res, next) {
  var clientToken = req.headers.token;
  var decoded = jwt.verify(clientToken, 'vueblog');
  var username = decoded.username;

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err);
      return res.json({
        code: 401,
        message: "表单解析错误"
      });
    }
    // console.log(files)
    // 获取对象的最后一项
    var lastItem = files[Object.keys(files)[Object.keys(files).length - 1]];

    // 获取后缀名
    var extname = Date.now() + path.extname(lastItem.name);
    var oldUrl = lastItem.path;
    var newUrl = './public/pictures/' + extname;
    var imgUrl = req.protocol + '://' + req.headers.host + '/public/pictures/' + extname;

    // 更改名字和路径,实现上传
    var readStream = fs.createReadStream(oldUrl);
    var writeStream = fs.createWriteStream(newUrl);
    readStream.pipe(writeStream);
    readStream.on('end', function () {
      return res.send(imgUrl);
    });
  });
};

exports.deleteArticle = function (req, res, next) {
  var id = Number(req.query.id) || '';
  db.deleteMany('infos', { date: id }, function (err, result) {
    if (err) {
      console.log(err);
      return res.json({
        code: 401,
        message: "文章删除失败"
      });
    }

    return res.json({
      code: 200,
      message: "文章删除成功"
    });
  });
};

exports.noData = function (req, res, next) {
  return res.json({
    code: 404,
    message: '数据获取失败'
  });
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by dell on 2017/5/14.
 */
var md5 = __webpack_require__(1);
var user = 'q';
var pass = md5('q');
var avatar = 'avatar.jpg';
var intro = 'Never too old to learn';
var nickname = 'VueBlog';
module.exports = {
    dbUrl: 'mongodb://localhost:27017/vueblog',
    user: user,
    pass: pass,
    avatar: avatar,
    intro: intro,
    nickname: nickname
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("formidable");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var jwt = __webpack_require__(0);
var db = __webpack_require__(2);
module.exports = function (req, res, next) {
  var clientToken = req.headers.token;
  if (clientToken) {
    var decoded = jwt.verify(clientToken, 'vueblog');
    // 从token中拿到用户名和userID
    var username = decoded.username;
    var userID = decoded.userID;
    // 查找数据库对比用户信息
    db.find('users', {}, function (err, result) {
      if (result[0].user === username && result[0]._id + '' === userID) {
        next();
      } else {
        return res.json({
          code: 401,
          message: "验证失败"
        });
      }
    });
  } else {
    return res.json({
      "code": 401,
      "message": "请登录后操作"
    });
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {
  head: {
    title: 'vueblog',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '支持(vue ssr)服务端渲染的前后端分离博客系统，基于Nuxt.js和Vue.js开发，采用Node.js作中间渲染层，支持PWA，markdown编辑器极速书写，vueblog只为追求良好的用户体验' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  env: {
    runningPort: process.env.PORT || 3000
  },
  build: { vendor: ['axios', 'highlight.js'] },
  css: ['normalize.css/normalize.css', 'highlight.js/styles/github.css', { src: '~assets/css/main.scss', lang: 'scss' }],
  loading: { color: '#337AB7' },
  manifest: {
    name: 'VueBlog',
    description: 'A blog system',
    theme_color: '#188269'
  },
  modules: ['@nuxtjs/pwa', '@nuxtjs/component-cache'],
  plugins: ['~plugins/filters.js']
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map