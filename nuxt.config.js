module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
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
        content: 'Essay, 博客系统'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Essay， 一个基于现代化前端技术开发的轻量级博客系统'
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

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#42B983'
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/styles/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/components.js', '~/plugins/filters.js', {
    src: '~/plugins/wmui.js',
    ssr: true
  }],
  /*
   ** Nuxt.js modules
   */
  modules: [],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
