module.exports = {
  head: {
    title: 'VueBlog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '一个轻量的用于记录笔记的博客应用' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: ['~assets/css/main.css', 'highlight.js/styles/github.css'],
  loading: { color: '#337AB7' },
  build: {
    vendor: ['axios'],
    postcss: [
      require('postcss-import')(),
      require('postcss-url')(),
      require('postcss-cssnext')()
    ],
    /*extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }*/
  },
  manifest: {
    name: 'VueBlog',
    description: 'A blog system',
    theme_color: '#000'
  },
  modules: ['@nuxtjs/pwa'],
  plugins: ['~/plugins/components.js', '~/plugins/filters.js']
}
