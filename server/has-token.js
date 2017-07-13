const jwt = require('jsonwebtoken')
module.exports = (req,res,next){
  let token = req.cookies.token;
  let username = req.cookies.username;
  if(token){
    jwt.verify(token, 'vueblog', function(err, decoded){
      if(!err && decoded.username === username ){
        req.decoded = decoded
        next()
      }else{
        req.cookie('token','',{maxAge:0})
        req.cookie('username','',{maxAge:0})
      }
    })
  }else{
    res.send('请登录后操作');
    return;
  }
}