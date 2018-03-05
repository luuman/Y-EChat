import Vue from 'vue'
import Router from 'vue-router'

const Index = r => require.ensure([], () => r(require('VIEW/index')), 'index')
const Sale = r => require.ensure([], () => r(require('VIEW/sale')), 'sale')
const Nav = r => require.ensure([], () => r(require('VIEW/nav')), 'nav')
const Login = r => require.ensure([], () => r(require('VIEW/login')), 'login')

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Index',
    //   // keepAlive: true,
    //   // beforeEnter (to, from, next) {
    //   //   console.log('router beforeEnter')
    //   //   next()
    //   // },
    //   meta: {
    //     title: 'FreezeFrame'
    //   },
    //   component: Index
    // },
    {
      path: '/Nav',
      name: 'Nav',
      meta: {
        title: '菜单'
      },
      component: Nav
    },
    {
      path: '/',
      name: 'Sale',
      meta: {
        title: '年终销售统计图表'
      },
      component: Sale
    },
    {
      path: '/Index',
      name: 'Index',
      meta: {
        title: '菜单'
      },
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      meta: {
        title: ''
      },
      component: Login
    }
  ]
})
