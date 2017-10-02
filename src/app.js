import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'
import axios from 'axios'
import cookies from 'js-cookie'
// https://github.com/vuetop/top-toast
// https://github.com/vuetop/top-editor
import TopEditor from 'top-editor'
import TopToast from 'top-toast'
Vue.use(TopEditor)
Vue.use(TopToast)

Vue.prototype.axios = axios
Vue.mixin(titleMixin)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const store = createStore()
const router = createRouter()

sync(store, router)
axios.defaults.timeout = 5000
// console.log(`${location.protocol}//${location.host}/api` )
const baseURL = 'http://localhost:8080/api'

axios.defaults.baseURL = baseURL

// http response interceptors
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.log(error.response.status)
    }
    return Promise.reject(error.response.data)
  })

// http request interceptors
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  })

// login router intercept
router.beforeEach((to, from, next) => {
  if (to.meta.Auth) {
    if (cookies.get('token') || store.state.cookies.token) {
      next()
    } else {
      router.push({ name: 'login' })
    }
  } else {
    next()
  }
})

export function createApp () {
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
