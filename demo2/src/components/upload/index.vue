<template>
  <re-dialog ref="dialog"
             :height="'400px'"
             :width="'700px'"
             :title="title"
             :show.sync="show">
    <div class="">
      <!-- drag 是否启用拖拽上传 -->
      <!--limit 最大允许文件上传的个数 -->
      <!--headers 设置上传的请求头部 -->
      <!--on-change 文件状态改变时的钩子，添加文件，上传成功和上传失败都会被调用 -->
      <!--on-success文件上传成功后的回调函数 -->
      <el-upload ref="upload"
                 class=""
                 drag
                 :limit="limitLen"
                 :accept="accept"
                 :action="action"
                 :headers="uploadHead"
                 :on-change="uploadChange"
                 :on-success="uploadSuccess">
      </el-upload>
    </div>
  </re-dialog>
</template>
<script>
export default {
  name: 'upload',
  props: {
    title: {
      type: String,
      default: ''
    },
    // 限制文件上传的数
    limitLen: {
      type: Number,
      default: 1
    },
    // 可接受文件上传的类型
    accept: {
      type: String,
      default: '.zip'
    },
    // 上传地址
    action: {
      type: String,
      default: ''
      // default: `${app_api_file}/whole/comm/file/upload`
    },
    // 上传头部
    uploadHead: {
      type: Object,
      default: () => {
        return {
          Authorization: ''
        }
      }
    }
  },
  data () {
    return {
      show: false,
      fileList: []
    }
  },
  methods: {
    // 上传文件改变
    uploadChange (file, fileList) {
      console.log(file, 'file')
      this.fileList = fileList
    },
    //  文件上传成功
    uploadSuccess (response, file, fileList) {
    }
  }
}
</script>
<style lang="scss">
</style>
