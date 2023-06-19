module.exports = {
  isChecked(list = [], current = '') {
    return list.includes(current) ? 'checked' : '';
  },
};
