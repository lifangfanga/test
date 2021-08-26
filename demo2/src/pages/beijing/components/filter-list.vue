<template>
  <div class="filter-main">
    <div class="filter-box"
         v-for="item in filterList"
         :key="item.id">
      <div style="flex-direction:column;"
           class="box-title">
        {{item.name}}
      </div>
      <div flex="main:center;cross:center;"
           style="flex-wrap: wrap;">
        <div v-for="lst in item.objList"
             :key="lst.id">
          <div :class="['button-item',lst.selected===true?'active':'']"
               @click="changeFilter(lst, item.objList)">{{lst.name}}</div>
        </div>
      </div>
    </div>
    <!-- 底部按钮区域 -->
    <div class="btn-area"
         flex>
      <div class="reset-btn"
           @click="cancelFilter">取消</div>
      <div class="sure-btn"
           @click="sureFilter">确定</div>
    </div>
  </div>
</template>

<script>
import { busOn } from '@/utils/busEvent'
export default {
  name: 'filter-list',
  mixins: [busOn],
  props: {
    filterList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    show () {
      console.log('测试组件通信')
    },
    // 点击筛选项按钮
    changeFilter (lst, parent) {
      parent.forEach((item) => {
        this.$set(item, 'selected', false)
      })
      this.$set(lst, 'selected', true)
    },
    // 取消按钮
    cancelFilter () {
      this.$emit('cancel-file')
    },
    // 确定按钮
    sureFilter (val) {
      this.$emit('change-file')
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-box {
  padding: 20px 2px 10px 20px;
  .box-title {
    // margin: 20px 720px 10px -8px;
  }
}
.button-item {
  width: 100px;
  height: 30px;
  padding: 0px 10px;
  margin: 10px;
  line-height: 30px;
  text-align: center;
  background-color: #f4f4f4;
  border: 1px solid #dcdcdc;
  &.active {
    background-color: #3a89fd;
    border: 1px solid #3a89fd;
    color: #fff;
  }
}
.btn-area {
  margin-left: 200px;
  .reset-btn {
    width: 100px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #dcdcdc;
  }
  .sure-btn {
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-color: #3a89fd;
    border: 1px solid #3a89fd;
  }
}
</style>
