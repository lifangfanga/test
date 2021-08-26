<template>
  <el-tabs v-model="activeName"
           @tab-click="handleClick">
    <el-tab-pane label="用户电台"
                 name="first">用户管理</el-tab-pane>
    <el-tab-pane label="用户中心"
                 name="second">配置管理</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  props: {
    active: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  handleClick (key, keyPath) {
    this.$emit('update:active', key)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
