<template>
  <selection>
    <div>left</div>
    <el-button type="primary"
               size="mini"
               @click="isClick" />
  </selection>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  mounted () {
    // $on监听事件
    this.$on('isLeft', (val) => {
      console.log(val)
    })
  },
  methods: {
    // $emit触发事件
    isClick () {
      this.$emit('isLeft', '点击事件')
    }
  }
}
</script>

<style>
</style>
