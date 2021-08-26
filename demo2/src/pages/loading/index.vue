<template>
  <div>
    <!-- computed -->
    <el-button type="primary"
               size="small"
               @click="addNumber"></el-button>
    <div>{{this.price}}</div>
    <div>{{this.amount}}</div>
    <div>{{this.total}}</div>
    <!-- watch -->
    <div>商品价格:{{this.price2}}</div>
    <el-button type="primary"
               size="small"
               @click="reduceAmount"></el-button>
    <el-button type="primary"
               @click="load">查看详情</el-button>
    <li-dialog :title="'查看'"
               :width="'200'"
               :isshow.sync="view"
               @handleClick="handleClick">
      <!-- 弹框里面的内容 -->
      <div class="">

      </div>
      <!-- 按钮部分 -->
      <div slot="footer">
      </div>
    </li-dialog>
  </div>
</template>
<script>
export default {
  name: 'loading',
  data () {
    return {
      view: false,
      price: 10,
      amount: 20,
      price2: 30,
      amount2: 40

    }
  },
  // computed 计算属性，依赖于其他data数据的值，当依赖的数据值发生变化时，computed里计算的值也会发生变化
  computed: {
    total () {
      return this.price * this.amount
    }
  },
  // watch 观察属性，监听的数据发生变化时执行回调执行后续操作，适用于异步或开销比较大的操作
  watch: {
    amount2 () {
      this.price2++
    }
  },
  methods: {
    addNumber () {
      this.price++
    },
    // 数量下降
    reduceAmount () {
      this.amount2--
    },
    load () {
      this.view = true
      console.log(this.view, 'fff')
      // this.$loading.showLoading({
      //   info: '加载中'
      // })
    },
    handleClick () {
      console.log('点击确定之后的按钮')
      this.view = false
    }
  }
}
</script>
