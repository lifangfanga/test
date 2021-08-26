<template>
  <div class="loading"
       v-if="isShow">
    <div>{{info}}</div>
  </div>
</template>
<script>
export default {
  name: 'loading',
  data () {
    return {
      info: '正在加载',
      isShow: false
    }
  },
  methods: {
    showLoading (opt) {
      opt = opt || {}
      this.info = opt.info || '正在加载'
      this.isShow = true
      setTimeout(() => {
        this.hideLoading()
      }, opt.during || 2000)
    },
    hideLoading () {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss">
</style>
