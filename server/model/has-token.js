const jwt = require('jsonwebtoken')
const db = require('./db.js')
module.exports = (req, res, next) => {
  const clientToken = req.headers.token
  if (clientToken) {
    const decoded = jwt.verify(clientToken, 'vueblog');
    // 从token中拿到用户名和userID
    const username = decoded.username
    const userID = decoded.userID
    // 查找数据库对比用户信息
    db.find('users', {}, function(err, result) {
      if (result[0].user === username && result[0]._id + '' === userID) {
        next()
      } else {
        return res.json({
          code: 401,
          message: "验证失败"
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