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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_vuedemo_vueblog2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_D_vuedemo_vueblog2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_D_vuedemo_vueblog2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = __webpack_require__(3),
    Nuxt = _require.Nuxt,
    Builder = _require.Builder;

var bodyParser = __webpack_require__(4);
var cookieParser = __webpack_require__(5);
var app = __webpack_require__(6)();
var axios = __webpack_require__(7);
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3010;
// 服务端api地址
var axiosServer = axios.create({
  baseURL: 'http://127.0.0.1:8080/api'
});

app.set('port', port);
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/login', function (req, res) {
  // 后台验证用户信息，并返回token
  var login = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_D_vuedemo_vueblog2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee() {
      var _ref2, data;

      return __WEBPACK_IMPORTED_MODULE_0_D_vuedemo_vueblog2_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return axiosServer.post('/login', req.body);

            case 2:
              _ref2 = _context.sent;
              data = _ref2.data;
              return _context.abrupt('return', data);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function login() {
      return _ref.apply(this, arguments);
    };
  }();

  login().then(function (data) {
    // 把token存储到cookie中
    var token = data.token;

    res.cookie('token', token, {
      maxAge: 60000 * 60 * 24
    });
    // 原封不动返回
    return res.json(data);
  });
});
app.post('/api/logout', function (req, res) {
  res.clearCookie('token');
  res.json({
    code: 200,
    msg: '退出登录'
  });
});
// Import and Set Nuxt.js options
var config = __webpack_require__(8);
config.dev = !("development" === 'production');

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {
  head: {
    title: 'vueblog',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  build: { vendor: ['axios', 'highlight.js', 'top-editor', 'top-toast'] },
  css: ['normalize.css/normalize.css', { src: '~assets/css/main.scss', lang: 'scss' }, 'highlight.js/styles/github.css'],
  loading: { color: '#337AB7' },
  plugins: ['~plugins/filters.js', '~plugins/top-editor.js', {
    src: '~plugins/top-toast.js',
    ssr: false
  }]
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map