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
      <div v-for="lst in list"
           :key="lst.id">
        <div v-for="item in data"
             :key="item.id"
             flex="main:center;cross:center;box:mean;">
          <div flex-box="0">{{item.label}}:</div>
          <div flex-box="1">{{lst[item.prop]}}</div>
        </div>
      </div>
      <el-button type="primary"
                 size="small"
                 @click="viewlDetail">查看详情</el-button>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting"
             style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click="viewDetail">查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
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
      </el-main>
      <template>
        <div class="block">
          <yk-pagination :current-page="pagination.page"
                         :total="total"
                         @page-size="handleSizeChange"
                         @current-change="handleCurrentChange">
          </yk-pagination>
          <!-- <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="pageSizes"
                         :current-page.sync="currentPage"
                         :layout="layout"
                         :total="total">
          </el-pagination> -->
        </div>
      </template>
    </el-container>
    <!-- <div class="">
    <el-button type="primary"
               @click="openUpload">文件上传</el-button>
    <upload ref="upload"
            title="上传文件"
            accept=".dwg"
            @confirm="uploadConfirm">
    </upload>
  </div> -->
    <li-dialog :title="'查看'"
               :isshow.sync="view">
    </li-dialog>
  </el-container>
</template>
<script>
import 'flex.css'
// import upload from '@/components/upload/index.vue'
// 从vuex中导入mapState
import { mapState, mapMutations, mapActions } from 'vuex'
import { foo } from '@/api/index.js'
export default {
  name: 'uploadBtn',
  props: {
  },
  components: {
    // upload
  },
  data () {
    const data = [{ name: '哈哈', age: 18 }]
    const btn = () => {
      const [first = {}] = data
      return first.name
    }
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      view: false,
      btn: btn(),
      list: [{ id: 0, title: '萌宝计划' }, { id: 1, title: '20210621' }],
      data: [{ label: '名称', prop: 'title' }],
      layout: 'total, sizes, prev, pager, next, jumper',
      tableData: Array(30).fill(item),
      total: 30,
      pagination: {
        rows: 20,
        page: 1
      }
    }
  },
  computed: {
    // 经过解构State后，自动就添加到了计算属性中，此时就可以直接像访问计算属性一样访问它
    ...mapState(['count'])
  },
  async mounted () {
    // 异步操作
    await this.$store.dispatch('setNum')
    console.log(this.count, 'dispatch 异步分发')
  },
  created () {
    console.log(foo(1, 2), '箭头函数')
    console.log(this.btn, 'btn')
    this.increment()
    // this.setChangeNumber({ count: 666 })
    // console.log(this.count, 'map')
    // 修改state里的值
    // 实现mutations里面的方法，传入不固定的参数
    // this.$store.commit('setChangeNumber', 666)
    // console.log(this.count, '修改后的值')

    this.testPromise()
  },
  methods: {
    // testPromise
    async testPromise () {
      // resolve ：异步操作执行成功后的回调函数
      // reject： 异步操作执行失败后的回调函数
      const p = await new Promise((resolve, reject) => {
        //  做一些异步操作
        setTimeout(() => {
          console.log('执行完成')
          resolve('我是成功!!')
        }, 2000)
      })
      console.log(p, 'p')
    },
    // 实现mutations里面的方法，传入不固定的参数
    ...mapMutations(['setChangeNumber']),
    // 经过解构actions后
    ...mapActions(['setNum']),
    increment () {
      this.setNum({ count: 12345 })
      console.log(this.count, 'lll')
      // this.$store.commit('increment')
      // console.log(this.$store.state.count)
      // Action 通过store.dispatch 异步 方法触发
      // 以载荷形式分发
      this.$store.dispatch('incrementAsync', { amount: 10 })
      // 以对象形式分发
      this.$store.dispatch({
        type: 'incrementAsync',
        amount: 10
      })
    },
    // 点击文件上传按钮
    openUpload () {
      this.$refs.upload.show = true
    },
    uploadConfirm () {
    },
    viewDetail () {

    },
    viewlDetail () {
      this.view = true
    },
    handleSelectionChange () {

    },
    // page-size  每页显示条目个数
    handleSizeChange (val) {
    },
    // current-page 当前页数
    handleCurrentChange (val) {
      this.pagination.page = val
      console.log(val, 'val')
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
