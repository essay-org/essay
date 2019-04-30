/*
 * @Author: wmui
 * @GitHub: https://github.com/wmui
 * @License: GPL-3.0
 */


const nodemailer = require('nodemailer')
const _ = require('lodash')
const mongoose = require('mongoose')
const globalConfig = require('../../config/global.config')

const Article = mongoose.model('Article')

const transporter = nodemailer.createTransport({
    host: globalConfig.email.host,
    port: 465,
    secure: true,
    auth: {
        user: globalConfig.email.user,
        pass: globalConfig.email.pass,
    },
})

exports.postEmail = async (req, res, next) => {
    const {
        fromUser,
        toUser,
        toUserEmail,
        content,
        id,
    } = req.body


    // 根据邮箱查找用户
    const article = await Article.findOne({ _id: id }).exec()
    if (!article) {
        res.json({
            success: false,
            message: '文章不存在',
        })
        return
    }

    const mailOptions = {
        from: globalConfig.email.user,
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
        res.json({
            success: true,
            data: info,
        })
    }).catch((error) => {
        res.json({
            success: false,
            message: '邮件发送失败',
            error,
        })
    })
}
