import Vue from 'vue'
const Bus = new Vue()

/**
 * 同级组件通讯，提交事件
 * @param {String} component 要提交的目标组件名称
 * @param {string} action       要调用目标组件的方法名
 * @param {any} param           目标组件的方法参数
 */

export const busEmit = (component, action, param) => {
  Bus.$emit(component, action, param)
}

/**
 *
 * 同级组件通讯，监听销毁事件
 */

export const busOn = {
  mounted () {
    Bus.$on(`${this.$options.name}`, this.onBusAction)
  },
  beforeDestroy () {
    Bus.$off(`${this.$options.name}`, this.onBusAction)
  },
  methods: {
    onBusAction (action, param) {
      this[action](param)
    }
  }
}
