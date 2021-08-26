<template>
  <div class="main-view">
    <div class="demo-image__preview">
      <el-image style="width: 100px; height: 100px"
                :src="url"
                :preview-src-list="srcList">
      </el-image>
    </div>
  </div>
</template>

<script>
import { busEmit } from '@/utils/busEvent'
export default {
  name: 'view-image',
  props: {
    url: {
      type: String,
      default: ''
    },
    srcList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  created () {
    this.emitShow()
  },
  methods: {
    // 引用busEmit发起同级组件通讯
    emitShow () {
      busEmit('filter-list', 'show')
    }
  }

}
</script>

<style>
</style>
