const nodemailer = require('nodemailer')
const config = require('../../config')
/**
 * 邮件通知
 */

module.exports = async (req, res, next) => {
  let body = req.body
  let {
    fromUserNickname,
    fromUserContent,
    fromUserEmail,
    toUserNickname,
    toUserContent,
    toUserEmail,
    articleId
  } = body
  if (!fromUserNickname || !fromUserContent || !fromUserEmail || !toUserNickname || !toUserContent || !toUserEmail || !articleId) {
    return (res.json({
      success: false,
      err: 'Field incomplete'
    }))
  }
  let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secure: true,
    auth: {
      user: config.emailConfig.user,
      pass: config.emailConfig.pass
    }
  })
  let mailOptions = {
    from: config.emailConfig.user,
    to: toUserEmail,
    subject: '博客评论通知',
    html: `<p>${fromUserNickname}回复了你的评论：<p>
    <p>原内容：${toUserContent}<p>
    <p>回复内容：${fromUserContent}<p>
    <p><a href="${res.locals.app.domain}/detail/${articleId}">查看原文</a></p>`.trim()
  }
  await transporter.sendMail(mailOptions).then(function (info) {
    res.json({
      success: true,
      data: info
    })
  }).catch(function (err) {
    res.json({
      success: false,
      err: err
    })
  })
}

