/**
 * Created by dell on 2017/5/14.
 */
let md5 = require('./md5.js')
let user = 'q'
let pass = md5('q')
let avatar = 'avatar.jpg'
let intro ='Never too old to learn'
let nickname = 'VueBlog'
module.exports = {
    dbUrl:'mongodb://localhost:27017/vueblog',
    user:user,
    pass:pass,
    avatar:avatar,
    intro:intro,
    nickname:nickname
}