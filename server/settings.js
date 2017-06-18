/**
 * Created by dell on 2017/5/14.
 */
var md5 = require('./md5.js');
var user = 'q';
var pass = md5('q');
var avatar = 'default.jpg';//头像
var intro ='Never too old to learn';
var nickname = 'VueBlog';
module.exports = {
    dbUrl:'mongodb://localhost:27017/vueblog',
    user:user,
    pass:pass,
    avatar:avatar,
    intro:intro,
    nickname:nickname
}