importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "vueblog",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.397ba146ae8fc40e84a6.js",
    "revision": "16d78596ab0795cfaf9d0c4b1e06dbf2"
  },
  {
    "url": "/_nuxt/common.b300478eb1b661ef0f24.js",
    "revision": "4f04284b6702546e232162f8ab6e005d"
  },
  {
    "url": "/_nuxt/layouts/admin.cdd01491d8df090e9cf6.js",
    "revision": "5d53366e76102b254da2744588df68e1"
  },
  {
    "url": "/_nuxt/layouts/default.00bd01b4f982d774490f.js",
    "revision": "b30a29a0aadc8b8bd2b4f0c165815ccf"
  },
  {
    "url": "/_nuxt/manifest.e8f026a4d31146053761.js",
    "revision": "cdacd4c31b4e9d1142f20a9ebddd2522"
  },
  {
    "url": "/_nuxt/pages/admin/_page.7ac84f1e321f322b0da7.js",
    "revision": "ce7cccc3a6928933ce62e8916a4a8544"
  },
  {
    "url": "/_nuxt/pages/archives/_category/_page.64d41e3c070ab67a4f1e.js",
    "revision": "01540961c708b45b6a73c74be862e3c2"
  },
  {
    "url": "/_nuxt/pages/archives/index.2261ee77a74a4af481cf.js",
    "revision": "a3df1fabfbec319a037ff0cd7e12fa21"
  },
  {
    "url": "/_nuxt/pages/article/_id.dc75f8fb27b5264f6c02.js",
    "revision": "27fcfab3c101f1f34bbdb414f85f597a"
  },
  {
    "url": "/_nuxt/pages/index.9d8097842893d56dd97c.js",
    "revision": "a17f63f7552ae107a79849009c436d3d"
  },
  {
    "url": "/_nuxt/pages/login/index.f36835e7d1937ce51f13.js",
    "revision": "de3e18424cc027d04737140d6a1787e2"
  },
  {
    "url": "/_nuxt/pages/publish/_id.35d5e9979ea257a845e5.js",
    "revision": "9f983321ea924dbf30ef71a5da5f1630"
  },
  {
    "url": "/_nuxt/pages/search/_category/_page.123a0fec7d1b3f74da7f.js",
    "revision": "4a341c3fab0b105a6f87678ed1071294"
  },
  {
    "url": "/_nuxt/pages/search/index.4e2b15c2ba48011e37e7.js",
    "revision": "a9f6af2b762f472063e3ff4b881d2359"
  },
  {
    "url": "/_nuxt/pages/tags/_category/_page.13a6ca1322d7116aaa04.js",
    "revision": "2f6f552275115d498ae12b3c7669159a"
  },
  {
    "url": "/_nuxt/pages/tags/index.0f28217961405a4382b7.js",
    "revision": "ef7984bae32723d1b2aa27a7cd9a020e"
  },
  {
    "url": "/_nuxt/pages/top/_page.b1274485278b0b555944.js",
    "revision": "66cad9d2ca1bd95cb028b3dfc5e6b61c"
  },
  {
    "url": "/_nuxt/pages/update-info/index.f7cbfe051b30c81d7fff.js",
    "revision": "24673d1576abd44290fd25e7da25c19c"
  },
  {
    "url": "/_nuxt/pages/update-password/index.277fe631617f9b2e9895.js",
    "revision": "f568d4c95d72985fb7d0fa6cc5d9eccc"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

