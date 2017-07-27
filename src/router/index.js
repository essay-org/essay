import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 需要渲染数据的组件
import { Article, List, Admin } from '../views/CreateListView'
// 不需要渲染数据的组件
const Login = () =>
  import ('../views/Login.vue')

const Publish = () =>
  import ('../views/admin/Publish.vue')

const UpdateAdminInfo = () =>
  import ('../views/admin/UpdateAdminInfo.vue')

const UpdateAdminPassword = () =>
  import ('../views/admin/UpdateAdminPassword.vue')

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
      path: '/admin/:page?',
      name: 'admin',
      meta: {
        Auth: true, // 需要登录
      },
      component: Admin('admin')
    }, {
      path: '/publish/:id?',
      name: 'publish',
      meta: {
        Auth: true,
      },
      component: Publish
    }, {
      path: '/updateAdminInfo',
      name: 'updateAdminInfo',
      meta: {
        Auth: true,
      },
      component: UpdateAdminInfo
    }, {
      path: '/updateAdminPassword',
      name: 'updateAdminPassword',
      meta: {
        Auth: true,
      },
      component: UpdateAdminPassword
    }, {
      path: '/',
      name: '404',
      redirect: '/index'
    }]
  })
}