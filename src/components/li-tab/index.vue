<template>
  <div class="li-tab">
    <van-tabs v-model="currentActive"
              :line-width="lineWidth"
              :color="color"
              :title-active-color="titleActivrColor"
              :type="type"
              @change="tabChange">
      <van-tab v-for="(item,i) in tabs"
               :key="i"
               :title="item.title"
               :name="item.code">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'li-tab',
  props: {
    tabsData: {
      type: Array,
      default: () => []
    },
    // 底部条宽度
    lineWidth: {
      type: String,
      default: '40px'
    },
    // 标签主题色
    color: {
      type: String,
      default: '#3a89fd'
    },
    // 样式风格类型
    type: {
      type: String,
      default: 'card'
    },
    // 标题文字选中态颜色
    titleActivrColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentActive: '',
      tabs: this.tabsData
    }
  },
  methods: {
    // tab点击切换
    tabChange (data) {
      this.$emit('tab-change', data)
    }
  }
}
</script>
<style lang="less" scoped>
.li-tab {
}
</style>