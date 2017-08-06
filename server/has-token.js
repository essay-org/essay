const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  let token = req.cookies.token;
  let username = req.cookies.username;
  let id = req.cookies.id;
  if (token) {
    jwt.verify(token, 'secret', function(err, decoded) {
      if (!err && decoded.username === username && decoded.id === id) {
        req.decoded = decoded
        next()
      } else {
        res.cookie('token', '', { maxAge: 0 })
        res.cookie('username', '', { maxAge: 0 })
        res.cookie('id', '', { maxAge: 0 })
        return res.json({
          "code": 401,
          "message": "登录失败"
        })
      }
    })
  } else {
    return res.json({
      "code": 401,
      "message": "请登录后操作"
    })
  }
}