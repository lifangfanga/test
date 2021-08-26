import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
// import routerName from '@/router'
Vue.use(Router)
// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({
//     y: 0
//   }),
//   routes: routerName
// })

// const router = createRouter()
// // 路由跳转之前
// router.beforeEach((to, from, next) => {
//   console.log(to.path, 'lll')
//   if (to.path !== '/login' && !localStorage.token) {
//     return next('/login')
//   }
//   next()
// })

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    count: 0
  },
  // this.$store.commit()同步操作  传值给vuex里面的mutations改变state
  // 存储 this.$store.commit('changeValue',name)
  // 取值 this.$store.state.changeValue
  // this.$store.dispatch() 异步操作  向后台提交数据
  mutations: {
    increment (state) {
      state.count++
    },
    setNumber (state) {
      state.count = 5
    },
    // 通过commit改变state里面的状态
    setChangeNumber (state, count) {
      state.count = count
    }
  },
  // 注册action 在action 中进行异步操作
  // Action 提交的是mutation, 而不是直接变更状态
  // Action可以包含任意异步操作
  actions: {
    increment (context) {
      context.commit('increment')
    },
    // 增加setNum方法,默认第一个参数是content,其值是复制的一份store
    setNum (content) {
      // 模拟一个异步操作，1s后修改count的值为888
      return new Promise(resolve => {
        setTimeout(() => {
          content.commit('setChangeNumber', { count: 888 })
          resolve()
        }, 1000)
      })
    }
  },
  modules: {
  }
})
