<template>
  <div class="block">
    <el-pagination :page-sizes="pageSizes"
                   :current-page.sync="currentPage"
                   :layout="layout"
                   :total="total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'yk-pagination',
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    // 每页展示的条数
    pageSizes: {
      type: Array,
      default () {
        return [20, 50, 100]
      }
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      layout: 'total, sizes, prev, pager, next, jumper'
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('page-size', val)
    },
    handleCurrentChange (val) {
      this.page = val
      this.$emit('current-page', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-pagination {
  white-space: nowrap;
  text-align: right;
  padding: 6px 5px;
  color: #303133;
  font-weight: 700;
}
</style>
