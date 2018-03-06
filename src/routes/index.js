import Vue from 'vue'
import Router from 'vue-router'

const Index = r => require.ensure([], () => r(require('VIEW/index')), 'index')
const Sale = r => require.ensure([], () => r(require('VIEW/sale')), 'sale')
const Nav = r => require.ensure([], () => r(require('VIEW/nav')), 'nav')
const Login = r => require.ensure([], () => r(require('VIEW/login')), 'login')
const Classify = r => require.ensure([], () => r(require('VIEW/classify')), 'classify')
const Year = r => require.ensure([], () => r(require('VIEW/year')), 'year')
const Basis = r => require.ensure([], () => r(require('VIEW/basis')), 'basis')
const Having = r => require.ensure([], () => r(require('VIEW/having')), 'having')

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
      path: '/Sale',
      name: 'Sale',
      meta: {
        title: '年终销售统计图表'
      },
      component: Sale
    },
    {
      path: '/Classify',
      name: 'Classify',
      meta: {
        title: '盈科大类销售统计'
      },
      component: Classify
    },
    {
      path: '/Year',
      name: 'Year',
      meta: {
        title: '盈科年终销售统计'
      },
      component: Year
    },
    {
      path: '/Basis',
      name: 'Basis',
      meta: {
        title: '销售同比环比'
      },
      component: Basis
    },
    {
      path: '/Having',
      name: 'Having',
      meta: {
        title: '盈科所有数据统计'
      },
      component: Having
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
