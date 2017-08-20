let crypto = require('crypto')
module.exports = function (content) {
    let md5 = crypto.createHash('md5')
    let newContent = md5.update(content).digest('base64')
    return newContent
}