const nodemailer = require('nodemailer')
const _ = require('lodash')
const mongoose = require('mongoose')
const globalConfig = require('../../config/global.config')

const Option = mongoose.model('Option')
const Article = mongoose.model('Article')

const getEmailOption = () => {
  return Option.findOne({ name: 'email' }).exec()
}

let transporter = ''
let emailOption = ''
getEmailOption().then(ret => {
  emailOption = ret.value
  transporter = nodemailer.createTransport({
    host: ret.value.host,
    port: 465,
    secure: true,
    auth: {
      user: ret.value.user,
      pass: ret.value.pass,
    },
  })
})

exports.postEmail = async (req, res, next) => {

  if (
    !emailOption.host ||
    !emailOption.user ||
    !emailOption.pass) {
    // res.handleError('未配置邮箱服务')
    next()
  }

  const {
    fromUser,
    toUser,
    toUserEmail,
    content,
    id,
  } = req.body

  const article = await Article.findOne({ _id: id }).exec()
  if (!article) return res.handleError('文章不存在')

  const mailOptions = {
    from: emailOption.user,
    to: toUserEmail,
    subject: '留言回复通知',
    html: `
        <h4>Hi,${toUser}，${fromUser} 回复了您</h4>
        <blockquote>
        <a href="${globalConfig.app.domain}/posts/${id}" target="_blank">${article.title}</a>
        <p>${content}</p>
        </blockquote>
        <p>PS: 本邮件由系统发送，请勿回复哦</p>
        `.trim(),
  }

  await transporter.sendMail(mailOptions).then((info) => {
    res.handleSuccess(info)
  }).catch((error) => {
    // res.handleError('邮件发送失败', error)
    next()
  })
}
