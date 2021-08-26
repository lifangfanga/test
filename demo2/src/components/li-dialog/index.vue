<template>
  <el-dialog :title="title"
             :width="width"
             :visible.sync="visible">
    <slot></slot>
    <!-- 按钮部分 -->
    <template slot="footer">
      <el-button type="primary"
                 size="small"
                 @click="sureConfirm">确定</el-button>
      <el-button size="small"
                 @click="cancelConfirm">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'li-dialog',
  props: {
    // 弹框标题
    title: {
      type: String,
      default: ''
    },
    // 宽度
    width: {
      type: String,
      default: ''
    },
    // 弹框是否展示
    isshow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // visible: this.isshow
    }
  },
  created () {
  },
  // 监听更多的属性，每当监听的数据变化时都会执行回调进行后续操作，数据变化时执行异步或开销较大的操作
  watch: {
    isshow: {
      immediate: true
      // handler (isshow) {
      //   this.visible = this.isshow
      // }
    }
  },
  //  计算属性，依赖于其他属性值(data里的数据)，computed的值有缓存，当依赖的值发生变化时，下一次获取computed的值就会重新计算
  computed: {
    visible: {
      get () {
        return this.isshow
      },
      set (val) {
        // this.$emit('update:isshow', false)的作用是 如果父组件上使用了.sync ，可以动态更新父级绑定的值
        this.$emit('update:isshow', false)
      }
    }
  },
  methods: {
    // 弹框确定按钮
    sureConfirm () {
      this.$emit('handleClick')
    },
    cancelConfirm () {
      this.visible = false
    }
  }
}
</script>

<style>
</style>
