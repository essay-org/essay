import Vue from 'vue'
import MarkdownIt from 'markdown-it'

export const cutString = (str, len) => {
    if (str) {
        const md = new MarkdownIt()
        str = md.render(str)
        str = str.replace(/<.*?>/g, '').replace(/&lt;.*?/g, '<').replace(/&gt;.*?/g, '>').replace(/\s/g, '')
        if (str.length * 2 <= len) {
            return str
        }

        let strlen = 0
        let s = ''
        for (let i = 0; i < str.length; i++) {
            s += str.charAt(i)
            if (str.charCodeAt(i) > 128) {
                strlen += 2
                if (strlen >= len) {
                    return `${s.substring(0, s.length - 1)}...`
                }
            } else {
                strlen += 1
                if (strlen >= len) {
                    return `${s.substring(0, s.length - 2)}...`
                }
            }
        }
        return s
    }
    return ''
}

const filters = {
    cutString,
}

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})
export default filters
