const globalConfig = require('../../config/global.config')

module.exports = (req, res, next) => {
    const robots = `
    User-agent: *
    Disallow: /admin/
    Disallow: /login/
    Sitemap: ${globalConfig.app.domain}/sitemap.xml`.trim()

    res.end(robots)
}
