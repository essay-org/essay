module.exports = {
  head: {
    title: 'vueblog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '支持(vue ssr)服务端渲染的前后端分离博客系统，基于Nuxt.js和Vue.js开发，采用Node.js作中间渲染层，支持PWA，markdown编辑器极速书写，vueblog只为追求良好的用户体验' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  build: { vendor: ['axios', 'highlight.js'] },
  css: ['normalize.css/normalize.css',
    {src: '~assets/css/main.scss', lang: 'scss'},
    'highlight.js/styles/github.css'],
  loading: { color: '#337AB7' },
  manifest: {
    name: 'VueBlog',
    description: 'A blog system',
    theme_color: '#188269'
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache'
  ],
  plugins: [
    '~plugins/filters.js'
  ]
}
