import Vue from 'vue'
import MarkdownIt from 'markdown-it'

export const cutString = (str, len) => {
  if (!str) return ''
  if (str.length < len) return str
  const md = new MarkdownIt()
  str = md.render(str)
  str = str.replace(/<.*?>/g, '').replace(/&lt;.*?/g, '<').replace(/&gt;.*?/g, '>').replace(/\s/g, '')
  return str.slice(0, len)
}

export const formatDate = (timestamp, format) => {
  const date = new Date(timestamp)
  const padLeftZero = function (str) {
    return ('00' + str).substring(str.length);
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      const str = o[k] + '';
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return format;
};

const filters = {
  cutString,
  formatDate,
}

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})


export default filters
