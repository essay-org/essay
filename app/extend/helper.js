const dayjs = require('dayjs');
const cheerio = require('cheerio');
module.exports = {
  isChecked(list = [], current = '') {
    return list.includes(current) ? 'checked' : '';
  },
  formatDate(date, format = 'YYYY/MM/DD') {
    return dayjs(date).format(format);
  },
  get(obj = {}, key = '') {
    return obj[key] || '';
  },
  // 解析content
  description(content) {
    const $ = cheerio.load(content);
    const des = $('p').text() || '';
    return des.slice(0, 60);
  },
};
