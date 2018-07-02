import MarkdownIt from 'markdown-it'
import mongoose from 'mongoose'
import config from '../config'
import fs from 'fs'
import path from 'path'
const nodemailer = require('nodemailer');
const Article = mongoose.model('Article')

// sitemap
export const sitemap = async(ctx, next) => {
  let sitemap = ''
  let head = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\r\n`
  let tail = '</urlset>'
  let res = await Article.find({ publish: true }).sort({ 'createdAt': -1 }).exec()
  let body = res.reduce((prev, curr) => {
    prev += `
      <url>
        <loc>${ctx.protocol}://${ctx.host}/detail/${curr.id}</loc>
        <lastmod>${curr.updatedAt}</lastmod>
        <priority>0.6</priority>
      </url>`.trim()
    return prev
  }, '')
  sitemap = head + body + tail
  ctx.type = 'application/xml'
  ctx.res.end(sitemap)
}


// rss
export const rss = async(ctx, next) => {
  let rss = ''
  let head = `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <title>${config.user.nickname}</title>
      <link>${ctx.protocol}://${ctx.host}</link>
      <description>${config.user.motto}</description>
      <atom:link href="${ctx.protocol}://${ctx.host}/rss.xml" rel="self"/>
      <language>zh-CN</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\r\n`
  let tail = `</channel>\r\n</rss>`
  let res = await Article.find({ publish: true }).sort({ 'createdAt': -1 }).exec()
  let body = res.reduce((prev, curr) => {
    let date = new Date(curr.updatedAt).toUTCString()
    let md = new MarkdownIt()
    let content = md.render(curr.content)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
    prev += `
      <item>
        <title>${curr.title}</title>
        <link>${ctx.protocol}://${ctx.host}/detail/${curr.id}</link>
        <description>${content}</description>
        <pubDate>${date}</pubDate>
        <guid>${ctx.protocol}://${ctx.host}/detail/${curr.id}</guid>
      </item>`.trim()
    return prev
  }, '')
  ctx.type = 'application/xml'
  rss = head + body + tail
  ctx.res.end(rss)
}



// robots
export const robots = (ctx, next) => {
  let robots = `
    User-agent: *
    Allow: /
    Sitemap: ${ctx.protocol}://${ctx.host}/sitemap.xml
    User-agent: YisouSpider
    Disallow: /
    User-agent: EasouSpider
    Disallow: /
    User-agent: EtaoSpider
    Disallow: /
    User-agent:`.trim()
  ctx.res.end(robots)
}

export const sendEmail = (ctx, next) => {
  let body = ctx.request.body
  let {
    fromUserNickname,
    fromUserContent,
    fromUserEmail,
    toUserNickname,
    toUserContent,
    toUserEmail,
    articleId
  } = body
  let emailInfo = ''
  if (!fromUserNickname || !fromUserContent || !fromUserEmail || !toUserNickname || !toUserContent || !toUserEmail || !articleId) {
    return (ctx.body = {
      success: false,
      err: 'Field incomplete'
    })
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
    <p>评论内容：${toUserContent}<p>
    <p>回复内容：${fromUserContent}<p>
    <p><a href="${config.production.domain}/detail/${articleId}">查看原文</a></p>`.trim()
  }

  // send mail with defined transport object
  /*transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return (ctx.body = {
        success: false,
        data: error
      })
    }
  })

  ctx.body = {
    success: true
  }*/

  function sendMail(mailOptions) {
    return new Promise(function(resolve, reject){
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error)
          return
        }
        resolve(info)
      })
    })
  }

  let promise = sendMail(mailOptions)
  promise.then((info) =>{
    ctx.body = {
      success: true,
      data: info
    }
  },(err) => {
    ctx.body = {
      success: false,
      data: err
    }
  })
}

/*export const configGithub = (ctx, next) => {
  let body = ctx.request.body
  fs.readFile(path.resolve(__dirname,'../config/index.js'), 'utf8', function (err,data) {
  if (err) {
    return (ctx.body = {
      success: false,
      data: err
    })
  }
  let result = data
  .replace(/githubClient: '\w+'/g, `githubClient: '${body.githubClient}'`)
  .replace(/githubSecret: '\w+'/g, `githubSecret: '${body.githubSecret}'`)

  fs.writeFile(path.resolve(__dirname, '../config/index.js'), result, 'utf8', function (err) {
     if (err) {
      return (ctx.body = {
        success: false,
        data: err
      })
     }
     ctx.body = {
      success: true,
      data:''
     }
  })
})
}

export const configSMTP = (ctx, next) => {
  let body = ctx.request.body
  fs.readFile(path.resolve(__dirname,'../config/index.js'), 'utf8', function (err,data) {
  if (err) {
    return (ctx.body = {
      success: false,
      data: err
    })
  }
  let result = data
  .replace(/user: ''/g, `user: '${body.user}'`)
  .replace(/pass: ''/g, `pass: '${body.pass}'`)

  fs.writeFile(path.resolve(__dirname, '../config/index.js'), result, 'utf8', function (err) {
    if (err) {
      return (ctx.body = {
        success: false,
        data: err
      })
     }
     ctx.body = {
      success: true,
      data:''
     }
  })
})
}*/
