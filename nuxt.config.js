const globalConfig = require('./server/config/global.config')
process.env.DOMAIN = globalConfig.app.domain

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~/plugins/components',
      ssr: true,
    },

    {
      src: '~/plugins/filters',
      ssr: true,
    },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa',
    ['@nuxtjs/google-analytics', {
      id: 'UA-125551361-1',
    }],
  ],
  styleResources: {
    scss: '~/assets/styles/main.scss'
  },
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
  },
  manifest: {
    name: 'Essay',
    short_name: 'Essay',
    display: 'standalone',
    background_color: '#f3f3f3',
    theme_color: '#1aad19',
    description: 'A blog system',
  },
}
