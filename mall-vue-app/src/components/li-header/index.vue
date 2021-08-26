<template>
  <header class="li-header">
    <!-- cross:交叉轴对齐方式 center 居中对齐  main: 主轴对齐方式，justify 两端对齐 -->
    <div flex="cross:center main:justify">
      <van-icon :name="icon"
                size="20"
                @click="leftClick">
      </van-icon>
      <div class="title">{{name}}</div>
      <!-- <div class="icon">{{option}}</div> -->
      <!-- 右边的具名插槽  子组件 -->
      <div class="icon">
        <slot name="right" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'li-header',
  props: {
    icon: {
      type: String,
      default: 'arrow-left'
    },
    name: {
      type: String,
      default: ''
    },
    option: {
      type: String,
      default: ''
    },
    // 左侧图标,默认返回
    // leftClick: {
    //   type: Function,
    //   default: () => {
    //     this.$router.go(-1)
    //   }
    // }
  },
  data () {
    return {

    }
  },
  methods: {
    leftClick () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.li-header {
  position: fixed;
  z-index: 10000;
  width: 100%;
  height: 44px;
  line-height: 44px;
  padding: 0 10px;
  border-bottom: 1px solid #dcdcdc;
  .title {
    margin: 0 auto;
    font-size: 14px;
    text-align: center;
  }
  .icon {
    margin: 5px 20px 0 0;
  }
}
</style>