<template>
  <div class="table-wrap"
       flex="dir:top">
    <el-table :data="data"
              size="mini"
              stripe
              :border="border"
              @selection-change="_handleSelectionChange"
              @cell-click="_cellClick">
      <el-table-column type="selection"
                       width="55"
                       align="center">
      </el-table-column>
      <!-- <el-table-column v-for="(row, i) in mainTable"
                       :key="i"
                       :prop="row.prop"
                       :label="row.label"
                       align="center">
      </el-table-column> -->
      <yk-table-column v-for="(row, i) in mainTable"
                       :key="i"
                       :row="row"
                       @operation-click="_operationClick"
                       @format-click="_formatClick">
        <!-- 具名插槽 -->
        <!-- <template v-if="row.slot===true"
                  v-slot:[row.prop]="scope"> -->
        <!-- 将当前行数据暴露出去 -->
        <!-- <slot :name="row.prop"
                :row="scope.row"
                :column="row"></slot>
        </template> -->
      </yk-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'yk-table',
  props: {
    // 表格数据
    data: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否显示多选框
    selection: {
      type: String,
      default () {
        return ''
      }
    },
    // 表格边框加纵向线
    border: {
      type: Boolean,
      default: true
    },
    // 表格标题
    head: {
      type: Array,
      default () {
        return []
      }
    },
    row: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      // 表格当前被选中的数据
      currentSelection: [],
      mainTable: this.head
    }
  },
  methods: {
    _handleSelectionChange (data) {
      let selection = data
      if (data.length > 1) {

      }
      this.currentSelection = selection
      // 触发多选框修改事件
      this.$emit('selection-change', selection)
    },
    // 单元格点击时触发该事件
    _cellClick (row, column, event) {
      this.$emit('cell-click', {
        row,
        column,
        event
      })
    },
    // 操作按钮点击
    _operationClick (type, data) {
      this.$emit('btn-click', data)
    },
    // 自定义部分被点击
    _formatClick (data) {
      this.$emit('formart-click', data)
    }
  }
}
</script>
<style lang="scss" scoped>
.table-wrap {
  height: 800px;
  padding: 10px;
}
::v-deep.el-table--border {
  height: 648px;
  border-right: none;
  border-bottom: none;
}
</style>
<style>
.el-table__body-wrapper {
  overflow: auto;
  position: relative;
  height: 610px;
}
/*修改滚动条样式*/
div::-webkit-scrollbar {
  width: 8px;
  height: 10px;
  border-radius: 10px;
  background-color: #e6ebf5;
}
</style>
