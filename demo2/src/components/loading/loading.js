import Vue from 'vue'
import loading from 'loading/index.vue'

const v = new Vue({
  render (createElement) {
    return createElement(loading)
  }
})

// 渲染
v.$mount()
// 挂载
document.body.appendChild(v.$el)
// 获取组件的实例
const load = v.$children[0]

//
function showLoading (opt) {
  load.showLoading(opt)
}

export default {
  showLoading
}
