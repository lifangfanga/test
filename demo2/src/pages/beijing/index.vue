<template>
  <div class="main">
    <el-button v-for="item in btns"
               :key="item.id"
               :type="item.type"
               :disabled="getBtnState(item.id)"
               size="small"
               @click="viewDetail(item.id)">{{item.label}}</el-button>
    <div class="btn-area">

    </div>
    <!-- <div class="main-task"
         v-for="(item,i) in task"
         :key="i">
      <div class=""
           flex-box="0">{{item.label}}</div>
    </div> -->
    <!-- 弹框筛选 -->
    <el-dialog title="查看详情"
               width="30"
               :visible.sync="dialogVisible">
      <filter-list :filterList="filterList"
                   @cancel-file="cancelFilter"
                   @change-file="changeFilter"></filter-list>
    </el-dialog>
    <!--图片预览  -->
    <el-dialog title="图片预览"
               width="30"
               :visible.sync="viewImage">
      <view-image :srcList="srcList"
                  :url="url"></view-image>
    </el-dialog>
  </div>
</template>
<script>
import { preloadImage, loadImg } from '@/api/index.js'
import { get } from '@/https.js'
import filterList from './components/filter-list'
import viewImage from './components/view-image/index.vue'
import { btns, TEST_RESULT, tranLabel } from './data'
import 'flex.css'
export default {
  name: 'beijing',
  components: {
    filterList,
    viewImage
  },
  data () {
    return {
      viewImage: false,
      btns: btns,
      task: [{ label: '安全监督' }],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      filterList: [{
        name: '项目状态',
        keyName: 'vTlev',
        objList: [
          { name: '迎风度夏', value: '01', select: false },
          { name: '迎风度夏', value: '02', select: false },
          { name: '迎风度夏', value: '03', select: false },
          { name: '迎风度夏', value: '04', select: false }
        ]
      },
      { name: '项目时间', keyName: 'time', objList: [{ name: '2021', value: '01', select: false }] }],
      dialogVisible: false
    }
  },
  created () {
    this.tranLabel()
    this.getFilter()
    this.loadImage()
    this.lodIMGE()
  },
  methods: {
    // 图片加载
    loadImage () {
      const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      preloadImage(url).then((image) => {
        alert('图片加载成功')
        return image
      })
    },
    getFilter () {
      get('/config.json').then((res) => {

      })
    },
    lodIMGE () {
      // 正确图片
      const url1 = 'https://pic1.zhimg.com/80/v2-56526051806eac83b1472801676c4eca_r.jpg'
      // 错误图片
      const url2 = 'https://pic1.zhimg.com/80/v2-56526051806eac83b1472801676c4eca_r-error.jpg'

      loadImg(url1).then(img1 => {
        console.log(img1.width)
        return img1 // 普通对象
      }).then(img1 => {
        console.log(img1.height)
        return loadImg(url2) // promise 实例
      }).then(img2 => {
        console.log(img2.width)
        return img2
      }).then(img2 => {
        console.log(img2.height)
      }).catch(err => console.error(err))
    },
    // 按钮状态
    getBtnState (id) {
      const btnState = {
        'detail': false
      }
      return btnState[id]
    },
    viewDetail (id) {
      switch (id) {
        case 'add':
          this.viewImage = true
          break
        case 'detail':
          this.dialogVisible = true
          break
        default:
          break
      }
    },
    // code转label的方法
    tranLabel () {
      const houTai = [{ name: '山水再相逢', state: '1' }]
      houTai.forEach((v) => {
        const { label } = tranLabel(v.state, TEST_RESULT, 'code')
        v.stateLabel = label
      })
    },
    // 筛选确定
    changeFilter () {
      const parmas = {
        vTlev: null,
        time: null
      }
      this.filterList.forEach((item) => {
        item.objList.forEach((v) => {
          if (item.keyName === 'vTlev' && v.selected) {
            parmas.vTlev = v.value
          }
          if (item.keyName === 'time' && v.selected) {
            parmas.time = v.value
          }
        })
      })
      console.log(parmas, 'parmas')
    },
    // 筛选取消
    cancelFilter () {
      this.filterList.forEach((item) => {
        item.objList.forEach((v) => {
          this.$set(v, 'selected', false)
        })
      })
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.main-task {
  // display: inline-block;
  margin: 10px;
  float: left;
}
.filter-box {
  padding: 20px 2px 10px 20px;
  .box-title {
    margin: 20px 450px 10px -8px;
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
}
.btn-area {
  margin: 10px auto;
  width: 200px;
  height: 30px;
  line-height: 30px;
  background-color: #3a89fd;
}
</style>
