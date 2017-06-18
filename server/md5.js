var crypto = require('crypto');
// md5 加密
module.exports = function (content) {
    var md5 = crypto.createHash('md5');
    var newContent = md5.update(content).digest('base64');
    return newContent;
};