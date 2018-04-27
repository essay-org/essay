module.exports = {
  head: {
    title: 'VueBlog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'renderer', content: 'webkit' },
      { hid: 'description', name: 'description', content: '一个小而美的博客应用' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_620064_9otr4k6uaufbhuxr.css' }
    ]
  },
  css: ['~assets/css/main.css', 'highlight.js/styles/github.css'],
  loading: { color: '#42B983' },
  build: {
    vendor: ['axios'],
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  manifest: {
    name: 'VueBlog',
    description: 'A blog system',
    theme_color: '#42B983'
  },
  modules: ['@nuxtjs/pwa', '@nuxtjs/axios'],
  plugins: ['~/plugins/components.js', '~/plugins/filters.js']
}
