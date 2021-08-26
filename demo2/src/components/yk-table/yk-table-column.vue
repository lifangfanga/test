<template>
  <el-table-column :label="row.label"
                   :prop="row.prop"
                   :align="align">
    <yk-table-column v-for="(column, i) in row.children"
                     :key="i"
                     :prop="column.prop"
                     :row="column">
    </yk-table-column>
    <!-- 插槽 -->
    <!-- <template slot-scope="scope">
      <slot :name="row.prop"
            :row="scope.row"></slot>
      <div :data-prop="row.prop"
           @click="_formatClick($event, row, scope.row)">
      </div>
    </template> -->
  </el-table-column>
</template>
<script>
export default {
  name: 'yk-table-column',
  props: {
    row: {
      type: Object,
      default () {
        return {}
      }
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    // 自定义部分被点击
    _formatClick ($event, head, row) {
      this.$emit('format-click', {
        $event,
        head,
        row
      })
    }
  }
}
</script>
