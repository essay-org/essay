import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'
import axios from 'axios'
Vue.prototype.axios = axios
  // mixin for handling title
Vue.mixin(titleMixin)
  // register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
const store = createStore()
const router = createRouter()
  // sync the router with the vuex store.
  // this registers `store.state.route`
sync(store, router)
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:8080/api'
  // http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(localStorage.getItem('token'))
    switch (response.data) {
      case 1:
        store.commit('LOGIN', localStorage.getItem('token'))
        store.commit('INFOMATIONS', '登陆成功')
        router.push({ name: 'essay' })
        break;
      case -1:
        store.commit('INFOMATIONS', '密码错误')
        break;
      case -2:
        store.commit('INFOMATIONS', '用户名不存在')
        break;
      case -3:
        store.commit('INFOMATIONS', '内部服务器错误')
        break;
      case 2:
        store.commit('INFOMATIONS', '发布成功')
        break;
      case -4:
        store.commit('INFOMATIONS', '发布失败')
        break;
    }

    return response;
  },
  error => {
    if (error.response) {
      // this.$router.push({name:'login'})
      // console.log(error.response)
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('LOGOUT');
          router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)
  });


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


router.beforeEach((to, from, next) => {
  if (to.meta.Auth) {
    if (localStorage.getItem('token') !== null) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next();
  }
})


// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp() {
  // create store and router instances


  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
