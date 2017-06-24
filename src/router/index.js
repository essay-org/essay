import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
  // 需要渲染数据的组件
import {Article, List } from '../views/CreateListView'
// 不需要渲染数据的组件
const Login = () =>
  import ('../views/Login.vue')
const Essay = () =>
  import ('../views/Essay.vue')
const Admin = () =>
  import ('../views/Admin.vue')
export function createRouter() {
  return new Router({
    mode: 'history',
    linkActiveClass: 'current',
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
      path: '/index/:page?',
      name: 'index',
      component: List('index'),
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/essay',
      name: 'essay',
      meta: {
        Auth: true, // 需要登录
      },
      component: Essay
    }, {
      path: '/category/:change?/:page?',
      name: 'category',
      component: List('category')
    }, {
      path: '/search/:change?/:page?',
      name: 'search',
      component: List('search')
    }, {
      path: '/archive/:change?/:page?',
      name: 'archive',
      component: List('archive')
    }, {
      path: '/article/:id',
      name: 'article',
      component: Article('article')
    }, {
      path: '/admin',
      name: 'admin',
      meta: {
        Auth: true, // 需要登录
      },
      component: Admin
    }, {
      path: '/',
      name: '404',
      redirect: '/index'
    }]
  })
}
