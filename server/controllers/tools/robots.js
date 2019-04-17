/*
 * @Author: wmui
 * @GitHub: https://github.com/wmui
 * @License: GPL-3.0
 */
const config = require('../../config')

module.exports = (req, res, next) => {
    const robots = `
    User-agent: *
    Disallow: /admin/
    Sitemap: ${config.app.domain}/sitemap.xml`.trim()

    res.end(robots)
}
