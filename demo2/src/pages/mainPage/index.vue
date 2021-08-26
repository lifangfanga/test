<template>
  <el-container style="height: 96vh; border: 1px solid #eee">
    <el-aside width="200px"
              style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>导航二</template>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting"
             style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <div class="btn-area">
        <el-button class="btn-style"
                   v-for="(item, i) in btns"
                   :key="i"
                   :icon="item.icon"
                   :type="item.type"
                   size="small"
                   @click="handleBtnClick()">
          {{item.label}}
        </el-button>
      </div>
      <yk-table :data="table.data"
                :head="table.head"
                :border="true"
                @selection-change="selectionChange"
                @cell-click="cellClick"
                @formart-click="formatClick">
      </yk-table>
      <!-- <el-main>
        <el-table :data="tableData"
                  tooltip-effect="dark"
                  align="center"
                  border
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column prop="date"
                           label="日期"
                           width="140">
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           width="120">
          </el-table-column>
          <el-table-column prop="address"
                           label="地址">
          </el-table-column>
        </el-table>
      </el-main> -->
      <template>
        <div class="block">
          <yk-pagination :current-page="pagination.page"
                         :total="total"
                         @page-size="handleSizeChange"
                         @current-page="handleCurrentChange">
          </yk-pagination>
        </div>
      </template>
    </el-container>
    <el-dialog title="新增"
               :visible.sync="dialogShow">
      <lf-form :data="initData"
               :form-data="createForm">
      </lf-form>
    </el-dialog>
  </el-container>
</template>
<script>
// import ykPagination from '@/components/yk-pagination/index.vue'
import { userTable } from '@/data/mainPage.js'
export default {
  name: 'main-page',
  components: {
    // ykPagination
  },
  props: {
  },
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      initData: userTable.create,
      btns: userTable.tabs,
      table: {
        head: userTable.tableList,
        data: [
          { name: '李四' }, { name: '李四' }, { name: '李四' }, { name: '李四' },
          { name: '李四' }, { name: '李四' }, { name: '李四' }, { name: '李四' },
          { name: '李四' }, { name: '李四' }, { name: '李四' }, { name: '李四' }, { name: '李四' },
          { name: '李四' }, { name: '李四' }, { name: '李四' }, { name: '李四' }, { name: '李四' }
        ]
      },
      createForm: {},
      pagination: {
        page: 1,
        rows: 20
      },
      total: 0,
      tableData: Array(20).fill(item),
      dialogShow: false
    }
  },
  created () {
    this.testPromise()
  },
  methods: {
    // testPromise
    testPromise () {
      let p = new Promise((resolve, reject) => {
        //  做一些异步操作
        setTimeout(() => {
          console.log('执行完成')
          resolve('我是成功!!')
        }, 2000)
      })
      console.log(p, 'p')
    },
    handleSelectionChange () {
    },
    formatClick (data) {
      console.log(data, 'data')
    },
    cellClick (data) {
      console.log(data, 'data')
    },
    selectionChange (data) {
      console.log(data, 'data')
    },
    handleBtnClick () {
      this.dialogShow = true
    },
    handleSizeChange (val) {
      this.pagination.rows = val
    },
    handleCurrentChange (val) {
      this.pagination.page = val
    }
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.btn-area {
  display: flex;
}
.btn-style {
  flex-direction: column;
  margin: 5px 5px -2px 8px;
}
.el-main {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px;
}
::v-deep.table-wrap {
  height: 800px;
  overflow: hidden;
  padding: 10px;
}
.el-table--border {
  border-right: none;
  border-bottom: none;
  height: 90vh;
  width: 90wh;
  overflow: scroll;
}
.el-pagination {
  white-space: nowrap;
  text-align: right;
  padding: 6px 5px;
  color: #303133;
  font-weight: 700;
}
</style>
