module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  build: { vendor: ['axios'] },
  /*
  ** Global CSS
  */
  css: [{ src: '~assets/css/main.scss', lang: 'scss'}],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  axios: {
    baseURL: 'http://127.0.0.1:8080/api',
    credentials: false,
    proxyHeaders: false
  },
  plugins: [
    '~plugins/filters.js'
  ]
}
