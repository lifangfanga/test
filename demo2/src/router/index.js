import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routerName = new VueRouter({
  // hash路由 url后面带#号
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    // 进来进入登陆路由界面
    {
      path: '/',
      component: resolve => require(['@/pages/login/index.vue'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['@/components/header'], resolve)
    },
    {
      path: '/usercenter',
      component: resolve => require(['@/components/user-center/user-center'], resolve)
    },
    {
      path: '/userstation',
      component: resolve => require(['@/components/user-station/user-station'], resolve)
    },
    {
      path: '/changename',
      component: resolve => require(['@/components/change-name/change-name'], resolve)
    },
    {
      path: '/plan',
      component: resolve => require(['@/components/plan'], resolve)
    },
    {
      path: '/loading',
      component: resolve => require(['@/pages/loading/index'], resolve)
    },
    {
      path: '/mainPage',
      component: resolve => require(['@/pages/mainPage/index'], resolve)
    },
    {
      path: '/beijing',
      component: resolve => require(['@/pages/beijing/index'], resolve)
    },
    {
      path: '/main',
      component: resolve => require(['@/components/main'], resolve)
    },
    {
      path: '/uploadBtn',
      component: resolve => require(['@/components/uploadBtn'], resolve)
    },
    {
      path: '/observer',
      component: resolve => require(['@/pages/observer/index'], resolve)
    }
  ]
})

export default routerName
