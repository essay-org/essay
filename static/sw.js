importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "vueblog-v2",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.fdb93a69e0f732f142d7.js",
    "revision": "db300aa0859152d419f474d141cb829b"
  },
  {
    "url": "/_nuxt/common.dd5e06755bb0d0a9cbd0.js",
    "revision": "968d889bea049fbc2661b3a6a2d208c8"
  },
  {
    "url": "/_nuxt/layouts/admin.929165b2e0294a7eedaa.js",
    "revision": "07f17610c6fc3deaa95200cabfd93faf"
  },
  {
    "url": "/_nuxt/layouts/default.afae86ae839a806b7109.js",
    "revision": "e6c5b280efe5f1a6f65ff62050ec6412"
  },
  {
    "url": "/_nuxt/manifest.a404293b27a7b823791b.js",
    "revision": "9467941519c060605194dd4dd85c44f1"
  },
  {
    "url": "/_nuxt/pages/admin/_page.a76dceea1d8cae35c846.js",
    "revision": "f53bbb287835f0b3d2cefea6dadbe2e8"
  },
  {
    "url": "/_nuxt/pages/archives/_category/_page.dedd484c9eaa41b16b26.js",
    "revision": "02665460998941bc7c0a68ab89c4df60"
  },
  {
    "url": "/_nuxt/pages/archives/index.83091730d910c15052e0.js",
    "revision": "7ec6ec9e38887535cc18db71df388cd7"
  },
  {
    "url": "/_nuxt/pages/article/_id.4b5678b829bab44386cc.js",
    "revision": "9119d8eb82ab53d00607303f325d02b1"
  },
  {
    "url": "/_nuxt/pages/index.8ef722ad26c4c7860df9.js",
    "revision": "0b4c72345ccb2687a5e85893efdd226c"
  },
  {
    "url": "/_nuxt/pages/login/index.3bd4dc826111869fdec1.js",
    "revision": "f1f4abcbf69986b26b58b27493e706ad"
  },
  {
    "url": "/_nuxt/pages/publish/_id.118f1a44f6f4945940d5.js",
    "revision": "64d908c220d073894f39ee6c5bec15f8"
  },
  {
    "url": "/_nuxt/pages/search/_category/_page.a9a7fc40aa25b43f64b1.js",
    "revision": "25f4265a9b7e604c5be609bc0e457411"
  },
  {
    "url": "/_nuxt/pages/search/index.3b620016e1f018357ce7.js",
    "revision": "e926b7284431d84251966e604a0b7db2"
  },
  {
    "url": "/_nuxt/pages/tags/_category/_page.583c8ac8ccecf1640ae3.js",
    "revision": "ccab80a9db2f48fb64eb518681463b35"
  },
  {
    "url": "/_nuxt/pages/tags/index.be70499752980aa51f78.js",
    "revision": "1eb851ce8d809ff73e45406ce397d4ff"
  },
  {
    "url": "/_nuxt/pages/top/_page.7501f7de6b2cb625ac59.js",
    "revision": "cb663ec35d82eb7eb2d25a2b2690d785"
  },
  {
    "url": "/_nuxt/pages/update-info/index.c7c8e7b885d5a262f21b.js",
    "revision": "043691622211d67b221caeb65ab04264"
  },
  {
    "url": "/_nuxt/pages/update-password/index.e5fd10bca4fafd34980f.js",
    "revision": "6da9c2a0f0f4746bcb2a9ab55ee7048d"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

