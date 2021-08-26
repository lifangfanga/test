import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import loading from './components/loading/index.vue'
import vComponent from './components/index.js'
// import routerName from '@/router'
// Vue.use(Router)
// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({
//     y: 0
//   }),
//   routes: routerName
// })

// const router = createRouter()
// 路由跳转之前 to即将要进入的目标路由
// from 离开的路由
// next 一定要调用该方法来 resolve(执行) 这个钩子。执行效果依赖 next 方法的调用参数。
// router.beforeEach((to, from, next) => {
// 判断有没有token,没有token则重定向到登陆页面，表示路由拦截成功
// if (to.path !== '/' && !localStorage.token) {
// 表示路由拦截成功，重定向至login，会再次调用router.beforeEach()
// console.log(to.path, 'path')
// return next('/')
// }
// 表示路由成功，直接进入to路由，不会再次调用 router.beforeEach()
// next()
// console.log(next(), 'next()')
// })
// 全局注册组件
Vue.use(vComponent)
Vue.config.productionTip = false
Vue.prototype.$loading = loading
Vue.use(VueRouter)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
