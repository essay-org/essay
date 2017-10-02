import marked from 'marked'

// 时间格式化
export function formatDate (date, fmt) {
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

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

// 截取指定个数的字符串
export function cutString (str, len) {
  if (str !== null) {
    if (str.length * 2 <= len) {
      return str
    }
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

export function status (str) {
  if (str === 'publish') {
    return '发布'
  }
  if (str === 'draft') {
    return '草稿'
  }
}

// markdown parse
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

// 转义html中字符并解析
export function markdownParse (str) {
  let markdownParse = marked(str)
  return markdownParse.replace(/<.*?>/g, '').replace(/&lt;.*?/g, '<').replace(/&gt;.*?/g, '>')
}

// 归档格式转换
export function formatArchive (date) {
  let year = date.slice(0, 4)
  let month = date.slice(4)
  if (date.slice(4, 5) === '0') {
    month = date.slice(5)
  }
  return `${year}年${month}月`
}
