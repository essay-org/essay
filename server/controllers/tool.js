import MarkdownIt from 'markdown-it'
import mongoose from 'mongoose'
import config from '../config'
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
  let robots =`
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
