module.exports = {
  head: {
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'renderer',
        content: 'webkit'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Essays, 博客系统'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Essays, 一个基于现代化前端技术开发的轻量级博客系统'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'RSS 2.0',
        href: '/rss.xml'
      }
    ]
  },
  css: ['~assets/styles/main.scss'],
  loading: {
    color: '#42B983'
  },
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
    name: 'Essays',
    description: 'A blog system',
    theme_color: '#42B983'
  },
  modules: ['@nuxtjs/pwa', ['@nuxtjs/google-analytics', {
    id: 'UA-125551361-1'
  }]],
  plugins: ['~/plugins/components.js', '~/plugins/filters.js', {
    src: '~/plugins/wmui.js',
    ssr: true
  }]
}
