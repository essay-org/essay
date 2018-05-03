import MarkdownIt from 'markdown-it'

let getUpdatedDate = date => `<lastBuildDate>${date}</lastBuildDate>\r\n`
let tail = `</channel>
</rss>`

let getRssBodyFromBody = (result, config) => {
  let head = `<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>${config.title}</title>
    <link>${config.siteUrl}</link>
    <description>${config.description}</description>
    <atom:link href="${config.siteUrl}/rss.xml" rel="self"/>
    <language>zh-CN</language>\r\n`
  let body = result.data.reduce((prev, curr) => {
    let date = new Date(curr.updatedAt).toUTCString()
    let md = new MarkdownIt()
    let content = md.render(curr.content)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
    prev += `    <item>\r\n`
    prev += `      <title>${curr.title}</title>\r\n`
    prev += `      <link>${config.siteUrl}/detail/${curr.id}</link>\r\n`
    prev += `      <description>${content}</description>\r\n`
    prev += `      <pubDate>${date}</pubDate>\r\n`
    prev += `      <guid>${config.siteUrl}/detail/${curr.id}</guid>\r\n`
    prev += `    </item>\r\n`
    return prev
  }, '')
  return head + getUpdatedDate(new Date().toUTCString()) + body + tail
}

module.exports = {
  getRssBodyFromBody
}
