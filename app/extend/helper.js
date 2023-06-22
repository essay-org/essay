const dayjs = require('dayjs');

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
};
