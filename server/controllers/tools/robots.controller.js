/*
 * @Author: wmui
 * @GitHub: https://github.com/wmui
 * @License: GPL-3.0
 */
const globalConfig = require('../../config/global.config')

module.exports = (req, res, next) => {
    const robots = `
    User-agent: *
    Disallow: /admin/
    Sitemap: ${globalConfig.app.domain}/sitemap.xml`.trim()

    res.end(robots)
}
