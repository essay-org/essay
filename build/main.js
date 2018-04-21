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
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("mongoose");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    email: 'qq22337383@gmail.com',
    nickname: 'VueBlog',
    motto: 'Never too old to learn',
    avatar: 'avatar.png'
  },
  jwt: {
    secret: 'vueblog'
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'vueblog',
    port: 27017,
    username: '',
    password: ''
  },
  production: {
    host: '198.13.32.165',
    domain: 'https://www.86886.wang'
    // domain: 'http://127.0.0.1:3000'
  },
  app: {
    host: '127.0.0.1',
    port: 3000,
    routerBaseApi: '/api'
  }
};

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("koa-router");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("md5");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = {
  head: {
    title: 'VueBlog',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { name: 'renderer', content: 'webkit' }, { hid: 'description', name: 'description', content: '一个小而美的博客应用' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_620064_9otr4k6uaufbhuxr.css' }]
  },
  css: ['~assets/css/main.css', 'highlight.js/styles/github.css'],
  loading: { color: '#42B983' },
  build: {
    vendor: ['axios']
    /*extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)(server)/
        })
      }
    }*/
  },
  manifest: {
    name: 'VueBlog',
    description: 'A blog system',
    theme_color: '#42B983'
  },
  modules: ['@nuxtjs/pwa', '@nuxtjs/axios'],
  plugins: ['~/plugins/components.js', '~/plugins/filters.js']
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares_check_token__ = __webpack_require__(17);





var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a({
  prefix: __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].app.routerBaseApi
});

var user = __webpack_require__(16);
var tag = __webpack_require__(15);
var article = __webpack_require__(14);

router.get('/user', user.getUserInfo).patch('/user', __WEBPACK_IMPORTED_MODULE_3__middlewares_check_token__["a" /* default */], user.patchUserInfo).post('/login', user.login).post('/logout', __WEBPACK_IMPORTED_MODULE_3__middlewares_check_token__["a" /* default */], user.logout);

router.get('/tags/:id?', tag.getTagsOrArticles).post('/tag', __WEBPACK_IMPORTED_MODULE_3__middlewares_check_token__["a" /* default */], tag.postTag).patch('/tag', __WEBPACK_IMPORTED_MODULE_3__middlewares_check_token__["a" /* default */], tag.patchTag).del('/tag/:id?', __WEBPACK_IMPORTED_MODULE_3__middlewares_check_token__["a" /* default */], tag.deleteTag);

router.get('/search/:keyword?', article.search).get('/article/:id?', article.getArticle).get('/articles/:page?/:limit?', article.getArticles).get('/private-articles', __WEBPACK_IMPORTED_MODULE_3__middlewares_check_token__["a" /* default */], article.getPrivateArticles).get('/archives', article.archives).post('/article', __WEBPACK_IMPORTED_MODULE_3__middlewares_check_token__["a" /* default */], article.postArticle).post('/upload', __WEBPACK_IMPORTED_MODULE_3__middlewares_check_token__["a" /* default */], article.upload).patch('/article', __WEBPACK_IMPORTED_MODULE_3__middlewares_check_token__["a" /* default */], article.patchArticle).del('/article/:id?', __WEBPACK_IMPORTED_MODULE_3__middlewares_check_token__["a" /* default */], article.deleteArticle);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("@koa/cors");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ },
/* 12 */
/***/ function(module, exports) {

module.exports = require("koa-static");

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_os__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_os___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_os__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_formidable__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_formidable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_formidable__);
/* harmony export (binding) */ __webpack_require__.d(exports, "getArticles", function() { return getArticles; });
/* harmony export (binding) */ __webpack_require__.d(exports, "getPrivateArticles", function() { return getPrivateArticles; });
/* harmony export (binding) */ __webpack_require__.d(exports, "getArticle", function() { return getArticle; });
/* harmony export (binding) */ __webpack_require__.d(exports, "postArticle", function() { return postArticle; });
/* harmony export (binding) */ __webpack_require__.d(exports, "patchArticle", function() { return patchArticle; });
/* harmony export (binding) */ __webpack_require__.d(exports, "deleteArticle", function() { return deleteArticle; });
/* harmony export (binding) */ __webpack_require__.d(exports, "search", function() { return search; });
/* harmony export (binding) */ __webpack_require__.d(exports, "archives", function() { return archives; });
/* harmony export (binding) */ __webpack_require__.d(exports, "upload", function() { return upload; });


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






var Article = __WEBPACK_IMPORTED_MODULE_1_mongoose___default.a.model('Article');

var getArticles = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var _ctx$params, _ctx$params$page, page, _ctx$params$limit, limit, total, data;

    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$params = ctx.params, _ctx$params$page = _ctx$params.page, page = _ctx$params$page === undefined ? 1 : _ctx$params$page, _ctx$params$limit = _ctx$params.limit, limit = _ctx$params$limit === undefined ? 15 : _ctx$params$limit;

            page = Number((page - 1) * limit) || 0;
            limit = Number(limit) || 15;

            _context.prev = 3;
            _context.next = 6;
            return Article.find({ publish: true }).exec();

          case 6:
            total = _context.sent;

            total = total.length;
            _context.next = 10;
            return Article.find({ publish: true }).populate({
              path: 'tags',
              select: 'id name'
            }).skip(page).limit(limit).sort({ 'createdAt': -1 }).exec();

          case 10:
            data = _context.sent;

            ctx.body = {
              success: true,
              data: data,
              total: total
            };
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](3);

            ctx.body = {
              success: false,
              err: _context.t0,
              total: 0
            };

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[3, 14]]);
  }));

  return function getArticles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getPrivateArticles = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
    var data;
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Article.find({ publish: false }).populate({
              path: 'tags',
              select: 'id name'
            }).sort({ 'updatedAt': -1 }).exec();

          case 2:
            data = _context2.sent;

            ctx.body = {
              success: true,
              data: data
            };

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function getPrivateArticles(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getArticle = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(ctx, next) {
    var id, article;
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = ctx.params.id;

            if (id) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt('return', ctx.body = {
              success: false,
              err: 'id is required'
            });

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return Article.findOne({ _id: id }).populate({
              path: 'tags',
              select: 'id name'
            }).exec();

          case 6:
            article = _context3.sent;
            _context3.next = 9;
            return Article.findByIdAndUpdate(id, { views: article.views + 1 }).exec();

          case 9:
            ctx.body = {
              success: true,
              data: article
            };
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](3);

            // console.log(e)
            ctx.body = {
              success: false,
              err: _context3.t0
            };

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this, [[3, 12]]);
  }));

  return function getArticle(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var postArticle = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee4(ctx, next) {
    var body, _body, title, content, publish;

    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            body = ctx.request.body;
            _body = body, title = _body.title, content = _body.content, publish = _body.publish;

            if (!(!title || !content || !String(publish))) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt('return', ctx.body = {
              success: false,
              err: 'Field incomplete'
            });

          case 4:
            _context4.prev = 4;
            _context4.next = 7;
            return new Article(body);

          case 7:
            body = _context4.sent;
            _context4.next = 10;
            return body.save();

          case 10:
            // when save article, we can replace id to object
            // await body.populate('tags').execPopulate()
            ctx.body = {
              success: true,
              data: body
            };
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4['catch'](4);

            ctx.body = {
              success: false,
              err: _context4.t0
            };

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this, [[4, 13]]);
  }));

  return function postArticle(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// modify publish article or private article
var patchArticle = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee5(ctx, next) {
    var body, _body2, id, title, content, publish;

    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            body = ctx.request.body;

            body.updatedAt = Date.now();
            _body2 = body, id = _body2.id, title = _body2.title, content = _body2.content, publish = _body2.publish;

            if (!(!id || !title || !content || !String(publish))) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt('return', ctx.body = {
              success: false,
              err: 'Field incomplete'
            });

          case 5:
            _context5.prev = 5;
            _context5.next = 8;
            return Article.findByIdAndUpdate(id, body).exec();

          case 8:
            body = _context5.sent;

            ctx.body = {
              success: true,
              data: body
            };
            _context5.next = 15;
            break;

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5['catch'](5);

            ctx.body = {
              success: false,
              err: _context5.t0
            };

          case 15:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this, [[5, 12]]);
  }));

  return function patchArticle(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var deleteArticle = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee6(ctx, next) {
    var id, body;
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = ctx.params.id;

            if (id) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt('return', ctx.body = {
              success: false,
              err: 'id is required'
            });

          case 3:
            _context6.prev = 3;
            _context6.next = 6;
            return Article.findByIdAndRemove(id).exec();

          case 6:
            body = _context6.sent;

            ctx.body = {
              success: true,
              data: body
            };
            _context6.next = 13;
            break;

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6['catch'](3);

            ctx.body = {
              success: false,
              err: _context6.t0
            };

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this, [[3, 10]]);
  }));

  return function deleteArticle(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var search = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee7(ctx, next) {
    var keyword, reg, body;
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            keyword = ctx.params.keyword;
            reg = new RegExp(keyword, 'i');
            _context7.prev = 2;
            _context7.next = 5;
            return Article.find({
              publish: true,
              $or: [{ title: { $regex: reg } }]
            }).sort({ 'createdAt': -1 }).exec();

          case 5:
            body = _context7.sent;

            ctx.body = {
              success: true,
              data: body
            };
            _context7.next = 12;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7['catch'](2);

            ctx.body = {
              success: false,
              err: _context7.t0
            };

          case 12:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this, [[2, 9]]);
  }));

  return function search(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

var archives = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee8(ctx, next) {
    var articles, arr, arr2, year, month, date, i, _i, total, archiveArticles, j;

    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return Article.find({ publish: true }).populate({
              path: 'tags',
              select: 'id name'
            }).select('id title tags createdAt updatedAt').sort({ 'createdAt': -1 }).exec();

          case 2:
            articles = _context8.sent;
            arr = [], arr2 = [], year = void 0, month = void 0, date = void 0;

            for (i = 0; i < articles.length; i++) {
              year = new Date(articles[i].createdAt).getFullYear() + '';
              month = new Date(articles[i].createdAt).getMonth() + 1 + '';
              if (month.length === 1) {
                month = '0' + month;
              }
              date = year + '\u5E74' + month + '\u6708';
              arr.push({
                date: date,
                article: articles[i]
              });
            }

            for (_i = 0; _i < arr.length;) {
              total = 0, archiveArticles = [];

              for (j = _i; j < arr.length; j++) {
                if (arr[_i].date === arr[j].date) {
                  archiveArticles.push(arr[j].article);
                  total++;
                }
              }
              arr2.push({
                date: arr[_i].date,
                articles: archiveArticles,
                total: total
              });
              _i += total;
            }

            ctx.body = {
              success: true,
              data: arr2
            };

          case 7:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, _this);
  }));

  return function archives(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

var upload = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee9(ctx, next) {
    var form, getImgUrl;
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            getImgUrl = function getImgUrl(ctx) {
              return new Promise(function (resolve, reject) {
                form.parse(ctx.req, function (err, fields, files) {
                  if (err) {
                    console.log(err);
                    reject(err);
                  }
                  // console.log(files)
                  var lastItem = files[Object.keys(files)[Object.keys(files).length - 1]];

                  // fetch file extname
                  var extname = Date.now() + __WEBPACK_IMPORTED_MODULE_2_path___default.a.extname(lastItem.name);
                  var oldUrl = lastItem.path;
                  var newUrl = './public/' + extname;

                  // modify file name and upload file
                  var readStream = __WEBPACK_IMPORTED_MODULE_4_fs___default.a.createReadStream(oldUrl);
                  var writeStream = __WEBPACK_IMPORTED_MODULE_4_fs___default.a.createWriteStream(newUrl);
                  readStream.pipe(writeStream);
                  var imgUrl = ctx.protocol + '://' + ctx.host + '/public/' + extname;
                  resolve(imgUrl);
                });
              });
            };

            form = new __WEBPACK_IMPORTED_MODULE_5_formidable___default.a.IncomingForm();
            _context9.next = 4;
            return getImgUrl(ctx).then(function (url) {
              ctx.body = url;
            });

          case 4:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, _this);
  }));

  return function upload(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mongoose__);
/* harmony export (binding) */ __webpack_require__.d(exports, "getTagsOrArticles", function() { return getTagsOrArticles; });
/* harmony export (binding) */ __webpack_require__.d(exports, "postTag", function() { return postTag; });
/* harmony export (binding) */ __webpack_require__.d(exports, "patchTag", function() { return patchTag; });
/* harmony export (binding) */ __webpack_require__.d(exports, "deleteTag", function() { return deleteTag; });


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }


var Tag = __WEBPACK_IMPORTED_MODULE_1_mongoose___default.a.model('Tag');
var Article = __WEBPACK_IMPORTED_MODULE_1_mongoose___default.a.model('Article');
var getTagsOrArticles = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var id, data;
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = ctx.params.id, data = void 0;

            if (!id) {
              _context.next = 14;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return Article.find({ publish: true, tags: [id] }).populate({
              path: 'tags',
              select: 'id name'
            }).sort({ 'updatedAt': -1 }).exec();

          case 5:
            data = _context.sent;

            ctx.body = {
              success: true,
              data: data
            };
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](2);

            ctx.body = {
              success: false,
              err: _context.t0
            };

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.next = 16;
            return Tag.find({}).sort({ 'updatedAt': -1 }).exec();

          case 16:
            data = _context.sent;

            ctx.body = {
              success: true,
              data: data
            };

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[2, 9]]);
  }));

  return function getTagsOrArticles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var postTag = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
    var body, _body, name;

    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;
            _body = body, name = _body.name;

            if (name) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt('return', ctx.body = {
              success: false,
              err: 'Tag name is required'
            });

          case 4:
            _context2.prev = 4;

            body = new Tag(body);
            _context2.next = 8;
            return body.save();

          case 8:
            ctx.body = {
              success: true,
              data: body
            };
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](4);

            ctx.body = {
              success: false,
              err: _context2.t0
            };

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this, [[4, 11]]);
  }));

  return function postTag(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var patchTag = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(ctx, next) {
    var body, _body2, id;

    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = ctx.request.body;

            body.updatedAt = Date.now();
            _body2 = body, id = _body2.id;

            if (id) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', ctx.body = {
              success: false,
              err: 'id is required'
            });

          case 5:
            _context3.prev = 5;
            _context3.next = 8;
            return Tag.findByIdAndUpdate(id, body).exec();

          case 8:
            body = _context3.sent;

            ctx.body = {
              success: true,
              data: body
            };
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3['catch'](5);

            ctx.body = {
              success: false,
              err: _context3.t0
            };

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this, [[5, 12]]);
  }));

  return function patchTag(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var deleteTag = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee4(ctx, next) {
    var id, body;
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = ctx.params.id;

            if (id) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt('return', ctx.body = {
              success: false,
              err: 'id is required'
            });

          case 3:
            _context4.prev = 3;
            _context4.next = 6;
            return Tag.findByIdAndRemove(id).exec();

          case 6:
            body = _context4.sent;

            ctx.body = {
              success: true,
              data: body
            };
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4['catch'](3);

            ctx.body = {
              success: false,
              err: _context4.t0
            };

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this, [[3, 10]]);
  }));

  return function deleteTag(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_md5__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(exports, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(exports, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(exports, "getUserInfo", function() { return getUserInfo; });
/* harmony export (binding) */ __webpack_require__.d(exports, "patchUserInfo", function() { return patchUserInfo; });


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }






var User = __WEBPACK_IMPORTED_MODULE_1_mongoose___default.a.model('User');

var login = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var _ctx$request$body, username, password, user, secret, expiresIn, token;

    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, username = _ctx$request$body.username, password = _ctx$request$body.password;

            password = __WEBPACK_IMPORTED_MODULE_3_md5___default()(password);
            _context.prev = 2;
            _context.next = 5;
            return User.findOne({ username: username, password: password }).exec();

          case 5:
            user = _context.sent;
            secret = __WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].jwt.secret;
            expiresIn = __WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].jwt.expiresIn;
            token = __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default.a.sign({ username: user.username, userID: user._id }, secret);

            ctx.cookies.set('token', token);
            ctx.body = {
              success: true,
              data: {
                token: token
              }
            };
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](2);

            ctx.body = {
              success: false,
              data: _context.t0
            };

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[2, 13]]);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var logout = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ctx.cookies.set('token', null);
            ctx.body = {
              success: true,
              data: {}
            };

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function logout(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getUserInfo = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(ctx, next) {
    var avatarUrl, data;
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            avatarUrl = ctx.protocol + '://' + ctx.host + '/public/' + __WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].user.avatar;
            _context3.prev = 1;
            _context3.next = 4;
            return User.findOne({ role: 'superAdmin' }).exec();

          case 4:
            data = _context3.sent;

            data.avatar = avatarUrl;
            ctx.body = {
              success: true,
              data: data
            };
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3['catch'](1);

            ctx.body = {
              success: false,
              err: _context3.t0
            };

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this, [[1, 9]]);
  }));

  return function getUserInfo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var patchUserInfo = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee4(ctx, next) {
    var body, oldPassword, newPassword, user;
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            body = ctx.request.body;

            if (!(body.oldPassword && body.newPassword)) {
              _context4.next = 21;
              break;
            }

            // update password
            oldPassword = __WEBPACK_IMPORTED_MODULE_3_md5___default()(body.oldPassword);
            newPassword = __WEBPACK_IMPORTED_MODULE_3_md5___default()(body.newPassword);
            _context4.prev = 4;
            _context4.next = 7;
            return User.findOne({ role: 'superAdmin' }).exec();

          case 7:
            user = _context4.sent;

            if (!(user.password !== oldPassword)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt('return', ctx.body = {
              success: false,
              err: 'Wrong password'
            });

          case 10:
            _context4.next = 12;
            return User.findOneAndUpdate({ role: 'superAdmin' }, { password: newPassword, updatedAt: Date.now() }).exec();

          case 12:
            body = _context4.sent;

            ctx.body = {
              success: true,
              data: body
            };
            _context4.next = 19;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4['catch'](4);

            ctx.body = {
              success: false,
              err: _context4.t0
            };

          case 19:
            _context4.next = 32;
            break;

          case 21:
            // update info
            body.updatedAt = Date.now();
            _context4.prev = 22;
            _context4.next = 25;
            return User.findOneAndUpdate({ role: 'superAdmin' }, body).exec();

          case 25:
            body = _context4.sent;

            ctx.body = {
              success: true,
              data: body
            };
            _context4.next = 32;
            break;

          case 29:
            _context4.prev = 29;
            _context4.t1 = _context4['catch'](22);

            ctx.body = {
              success: false,
              err: _context4.t1
            };

          case 32:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this, [[4, 16], [22, 29]]);
  }));

  return function patchUserInfo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(2);


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




var User = __WEBPACK_IMPORTED_MODULE_1_mongoose___default.a.model('User');

/* harmony default export */ exports["a"] = (function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var token, decoded, username, userID, user;
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = ctx.get('token');

            if (!token) {
              _context.next = 22;
              break;
            }

            decoded = __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default.a.verify(token, __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].jwt.secret);
            username = decoded.username;
            userID = decoded.userID;
            _context.prev = 5;
            _context.next = 8;
            return User.findOne({ _id: userID, username: username }).exec();

          case 8:
            user = _context.sent;

            if (!(user._id && user.username)) {
              _context.next = 14;
              break;
            }

            _context.next = 12;
            return next();

          case 12:
            _context.next = 15;
            break;

          case 14:
            return _context.abrupt('return', ctx.body = {
              success: false,
              err: 'Token is invalid'
            });

          case 15:
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](5);
            return _context.abrupt('return', ctx.body = {
              success: false,
              err: _context.t0
            });

          case 20:
            _context.next = 23;
            break;

          case 22:
            return _context.abrupt('return', ctx.body = {
              success: false,
              err: 'Please login'
            });

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[5, 17]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

var ArticleSchema = new Schema({
  title: String,
  content: String,
  publish: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  flag: {
    type: Number,
    default: 1
  },
  like: {
    type: Array,
    default: []
  },
  comments: {
    type: Array,
    default: []
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

ArticleSchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform: function transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
};
// db.articles.update({}, {$set: {flag: 1}}, {multi: 1})
__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Article', ArticleSchema);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_md5__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(2);


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





__webpack_require__(21);
__webpack_require__(20);
__webpack_require__(18);

var User = __WEBPACK_IMPORTED_MODULE_1_mongoose___default.a.model('User');

var mongoUrl = 'mongodb://' + __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].mongodb.host + ':' + __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].mongodb.port + '/' + __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].mongodb.database;
__WEBPACK_IMPORTED_MODULE_1_mongoose___default.a.Promise = global.Promise;
__WEBPACK_IMPORTED_MODULE_1_mongoose___default.a.connection.openUri(mongoUrl).once('open', _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee() {
  var userInfo, user;
  return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('database connect successed');
          // init admin information
          userInfo = __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].user;

          userInfo.password = __WEBPACK_IMPORTED_MODULE_2_md5___default()(userInfo.password);

          _context.next = 5;
          return User.findOne({ role: 'superAdmin' }).exec();

        case 5:
          user = _context.sent;

          if (user) {
            _context.next = 11;
            break;
          }

          user = new User(userInfo);
          _context.next = 10;
          return user.save();

        case 10:
          console.log('Administrator information initialization succeeded');

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, _this);
}))).on('error', function (error) {
  console.warn('database connect fail', error);
});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

var TagSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

TagSchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform: function transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  }
};

__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Tag', TagSchema);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);

var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

var UserSchema = new Schema({
  role: {
    type: String,
    default: 'user'
  },
  username: String,
  password: String,
  email: String,
  nickname: String,
  motto: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// hidden some field
UserSchema.options.toJSON = {
  virtuals: true,
  versionKey: false,
  transform: function transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.id;
    delete ret.password;
    delete ret.username;
  }
};
__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('User', UserSchema);

/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports = require("formidable");

/***/ },
/* 23 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports = require("os");

/***/ },
/* 25 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_static__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_koa_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_koa_bodyparser__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_koa_bodyparser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_koa_bodyparser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_koa_router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__koa_cors__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__koa_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__koa_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__routes__ = __webpack_require__(8);


var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2() {
    var _this = this;

    var app, host, port, router, config, nuxt, builder;
    return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();
            host = process.env.HOST || __WEBPACK_IMPORTED_MODULE_8__config__["a" /* default */].app.host;
            port = process.env.PORT || __WEBPACK_IMPORTED_MODULE_8__config__["a" /* default */].app.port;
            router = new __WEBPACK_IMPORTED_MODULE_6_koa_router___default.a();


            app.use(__WEBPACK_IMPORTED_MODULE_7__koa_cors___default()());
            app.use(__WEBPACK_IMPORTED_MODULE_5_koa_bodyparser___default()());
            app.use(__WEBPACK_IMPORTED_MODULE_4_koa_static___default()('.'));
            router.use('', __WEBPACK_IMPORTED_MODULE_9__routes__["a" /* default */].routes());
            app.use(router.routes()).use(router.allowedMethods());

            // Import and Set Nuxt.js options
            config = __webpack_require__(7);

            config.dev = !(app.env === 'production');

            // Instantiate nuxt.js
            nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

            // Build in development

            if (!config.dev) {
              _context2.next = 16;
              break;
            }

            builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
            _context2.next = 16;
            return builder.build();

          case 16:

            app.use(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
                return __WEBPACK_IMPORTED_MODULE_0_D_wmui_github_vueblog_koa_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return next();

                      case 2:
                        ctx.status = 200; // koa defaults to 404 when it sees that status is unset
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                          ctx.res.on('close', resolve);
                          ctx.res.on('finish', resolve);
                          nuxt.render(ctx.req, ctx.res, function (promise) {
                            // nuxt.render passes a rejected promise into callback on error.
                            promise.then(resolve).catch(reject);
                          });
                        }));

                      case 4:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }());

            app.listen(port, host);
            console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

          case 19:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }











start();

/***/ }
/******/ ]);
//# sourceMappingURL=main.map