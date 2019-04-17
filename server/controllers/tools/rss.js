/*
 * @Author: wmui
 * @GitHub: https://github.com/wmui
 * @License: GPL-3.0
 */
const MarkdownIt = require('markdown-it')
const mongoose = require('mongoose')
const config = require('../../config')

const Article = mongoose.model('Article')

module.exports = async (req, res, next) => {
    let rss = ''
    const head = `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <title>${config.app.siteName}</title>
      <link>${config.app.domain}</link>
      <description></description>
      <atom:link href="${config.app.domain}/rss.xml" rel="self"/>
      <language>zh-Hans</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\r\n`
    const tail = '</channel>\r\n</rss>'
    const articles = await Article.find({
        isPublish: true,
        isRecommend: true,
    }).limit(15).sort({
        createdAt: -1,
    }).exec()
    const body = articles.reduce((prev, curr) => {
        const date = new Date(curr.updatedAt).toUTCString()
        const md = new MarkdownIt()
        const content = md.render(curr.content)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
        prev += `
      <item>
        <title>${curr.title}</title>
        <link>${config.app.domain}/posts/${curr.id}</link>
        <description>${content}</description>
        <pubDate>${date}</pubDate>
        <guid>${config.app.domain}/posts/${curr.id}</guid>
      </item>`.trim()
        return prev
    }, '')

    res.set('Content-Type', 'application/xml')
    rss = head + body + tail
    res.end(rss)
}
