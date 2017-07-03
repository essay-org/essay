let crypto = require('crypto');
// md5 加密
module.exports = function (content) {
    let md5 = crypto.createHash('md5');
    let newContent = md5.update(content).digest('base64');
    return newContent;
};