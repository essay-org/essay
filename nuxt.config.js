module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'vueblog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  build: { vendor: ['axios', 'highlight.js', 'top-editor'] },
  /*
  ** Global CSS
  */
  css: [{ src: '~assets/css/main.scss', lang: 'scss'}],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#337AB7' },

  axios: {
    baseURL: 'http://127.0.0.1:8080/api',
    credentials: false,
    proxyHeaders: false
  },
  plugins: [
    '~plugins/filters.js',
    '~plugins/top-editor.js'
  ]
}
