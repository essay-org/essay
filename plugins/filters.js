import Vue from 'vue'
import MarkdownIt from 'markdown-it'

export function formatDate(date, fmt) {
  let newDate = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function cutString(str, len) {
  if (str !== null) {
    if (str.length * 2 <= len) {
      return str
    }
    let md = new MarkdownIt()
    str = md.render(str)
    str = str.replace(/<.*?>/g, '').replace(/&lt;.*?/g, '<').replace(/&gt;.*?/g, '>')
    let strlen = 0
    let s = ''
    for (let i = 0; i < str.length; i++) {
      s = s + str.charAt(i)
      if (str.charCodeAt(i) > 128) {
        strlen = strlen + 2
        if (strlen >= len) {
          return s.substring(0, s.length - 1) + '...'
        }
      } else {
        strlen = strlen + 1
        if (strlen >= len) {
          return s.substring(0, s.length - 2) + '...'
        }
      }
    }
    return s
  }
}

export function flag(flag) {
  switch (flag) {
    case 1:
      return '原创'
      break
    case 2:
      return '分享'
      break
    default:
      return '原创'
  }
}
const filters = { formatDate, flag, cutString }

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
export default filters
