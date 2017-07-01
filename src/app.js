import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'
import axios from 'axios'
Vue.prototype.axios = axios
  // minxin 处理动态标题
Vue.mixin(titleMixin)
  // 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
const store = createStore()
const router = createRouter()
  // 同步 router 和 the vuex store.
  // 使用方式 `store.state.route`
sync(store, router)
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:8080/api'
  // http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(localStorage.getItem('token'))
    switch (response.data) {
      case 1:
        store.commit('INFOMATIONS', '登陆成功')
        break;
      case 2:
        store.commit('INFOMATIONS', '草稿保存成功')
        break;
      case 3:
        store.commit('INFOMATIONS', '文章发布成功')
        break;
      case 4:
        store.commit('INFOMATIONS', '文章删除成功')
        break;
      case 5:
        store.commit('INFOMATIONS', '信息修改成功')
        break;
      case -1:
        store.commit('INFOMATIONS', '内部服务器错误')
        break;
      case -2:
        store.commit('INFOMATIONS', '用户名不存在')
        break;
      case -3:
        store.commit('INFOMATIONS', '密码错误')
        break;
      case -4:
        store.commit('INFOMATIONS', '请登陆后操作')
        break;
      case -5:
        store.commit('INFOMATIONS', '发布或保存文章失败')
        break;
      case -6:
        store.commit('INFOMATIONS', '信息修改失败')
        break;
      case -7:
        store.commit('INFOMATIONS', '图片应该小于1M')
        break;
      case -8:
        store.commit('INFOMATIONS', '头像修改失败')
        break;

    }

    return response;
  },
  error => {
    if (error.response) {
      // console.log(error.response.status)
    }
    return Promise.reject(error.response.data)
  });


// http request 拦截器
axios.interceptors.request.use(function(config) {
  // 发送请求前
  return config;
}, function(error) {
  // 请求发生错误
  return Promise.reject(error);
});


router.beforeEach((to, from, next) => {
  if (to.meta.Auth) {
    if (localStorage.getItem('token') !== 'null') {
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


export function createApp() {

  //创建应用程序实例。
     //这里我们将路由器，存储和ssr上下文注入到所有子组件，
     //让它们随处可见，通过使用`this.$router` 和 `this.$store`。
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })


  //公开app，router和store。
     //注意，我们没有在这里挂载应用程序，因为引导将是
     //根据我们是在浏览器还是在服务器上而不同。
  return { app, router, store }
}
