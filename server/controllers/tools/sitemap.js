/*
 * @Author: wmui
 * @GitHub: https://github.com/wmui
 * @License: GPL-3.0
 */
const mongoose = require('mongoose')
const config = require('../../config')

const Article = mongoose.model('Article')

// sitemap
module.exports = async (req, res, next) => {
    let sitemap = ''
    const head = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\r\n`
    const tail = '</urlset>'
    const articles = await Article.find({
        isPublish: true,
        isRecommend: true,
    })
        .sort({
            created_at: -1,
        })
        .exec()
    const body = articles.reduce((prev, curr) => {
        prev += `
      <url>
        <loc>${config.app.domain}/posts/${curr.id}</loc>
        <lastmod>${curr.updatedAt}</lastmod>
        <priority>0.6</priority>
      </url>`.trim()
        return prev
    }, '')
    sitemap = head + body + tail
    res.set('Content-Type', 'application/xml')
    res.end(sitemap)
}
