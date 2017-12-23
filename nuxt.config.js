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
  env: {
    runningPort: process.env.PORT || 3000
  },
  build: {
    vendor: ['axios', 'highlight.js'],
     extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)(server)/
        })
      }
    } 
  },
  css: ['normalize.css/normalize.css', 'highlight.js/styles/github.css', { src: '~assets/style/main.scss', lang: 'scss' }],
  loading: { color: '#337AB7' },
  manifest: {
    name: 'VueBlog',
    description: 'A blog system',
    theme_color: '#000'
  },
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/component-cache'
  ],
  plugins: [
    '~plugins/filters.js'
  ]
}
