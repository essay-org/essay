module.exports = {
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
  build: { vendor: ['axios', 'highlight.js'] },
  css: ['normalize.css/normalize.css',
    {src: '~assets/css/main.scss', lang: 'scss'},
    'highlight.js/styles/github.css'],
  loading: { color: '#337AB7' },
  plugins: [
    '~plugins/filters.js'
  ]
}
