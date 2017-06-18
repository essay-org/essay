import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
  // 需要渲染数据的组件
import { Index, Category, Article } from '../views/CreateListView'
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
      path: '/index/:id?',
      name: 'index',
      component: Index('index'),
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
      path: '/category',
      name: 'category',
      children: [{
        path: ':tag?',
        name: 'categoryTag',
        component: Category('category'),
        children: [{
          path: ':id?',
          name: 'categoryID',
          component: Category('category'),
        }]
      }],
      component: Category('category')
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
