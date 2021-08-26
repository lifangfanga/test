<template>
  <div class="wait-proj">
    <div class="wait-title">待处理工单</div>
    <div class="pad">
      <div class="white-bg van-bottom-line"
           v-for="(item,i) in list"
           :key="i">
        <div class="pad proj-name flex-style mar-l ">{{item.name}}
          <span class="warn mar-l">{{item.overTime}}</span>
          <span class="promise mar-l">{{item.promise}}</span>
          <span class="reject mar-l">{{item.reject}}</span>
        </div>
        <div class="flex-style"
             v-for="(lst,i) in formData"
             :key="i">
          <div class="label mar-r-b"
               flex="cross:center">{{lst.title}} :</div>
          <div class="label mar-r-b">{{item[lst.prop]}}</div>
        </div>
        <div class="btn-style">
          <div class="btn mar-l">{{item.back}}</div>
          <div class="btn mar-l">{{item.back}}</div>
        </div>
      </div>
      <!-- <div class="list-box">
      <div class="white-bg"
           v-for="(item,i) in list"
           :key="i">
        <div class="pad van-bottom-line">
          <div class="flex-style"
               v-for="(lst,i) in formData"
               :key="i">
            <div class="label mar-r-b"
                 flex-box="0">{{lst.title}} :</div>
            <div class="value mar-r-b"
                 flex-box="1">{{item[lst.prop]}}</div>
          </div>
        </div>
      </div>
    </div> -->
    </div>
  </div>
  <!-- <el-form :model="dynamicValidateForm"
           ref="dynamicValidateForm"
           label-width="100px"
           class="demo-dynamic">
    <el-form-item prop="email"
                  label="邮箱"
                  :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
      <el-input v-model="dynamicValidateForm.email"></el-input>
    </el-form-item>
    <el-form-item v-for="(domain, index) in dynamicValidateForm.domains"
                  :label="'域名' + index"
                  :key="domain.key"
                  :prop="'domains.' + index + '.value'"
                  :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }">
      <el-input v-model="domain.value"></el-input>
      <el-button @click.prevent="removeDomain(domain)">删除</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 @click="submitForm('dynamicValidateForm')">提交</el-button>
      <el-button @click="addDomain">新增域名</el-button>
      <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>
  </el-form> -->
</template>
<script>
// 数组：一组数据的集合
// 数组的创建方式：
// 1.字面量定义：var arr=[a1,a2,a3]
// 2.构造函数创建：new Array(a1,a2,a3)
export default {
  data () {
    return {
      list: [
        { overTime: '超时', promise: '督办', reject: '举报', pross: '班长', station: '湖南国网公司', name: '张*', back: '返回' },
        { pross: '班长', station: '湖南国网公司', name: '张*' }
        // { pross: '班长', station: '湖南国网公司' },
        // { pross: '班长', station: '湖南国网公司' },
        // { pross: '班长', station: '湖南国网公司' }
      ],
      formData: [
        { title: '职位', prop: 'pross' },
        { title: '单位', prop: 'station' }
      ],

      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: ''
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>
<style scoped>
.wait-proj {
  width: 100%;
  height: 30px;
  border-radius: 12px 12px;
  background-color: rgb(0, 183, 255);
}
.wait-title {
  display: flex;
  line-height: 30px;
  margin-left: 5px;
  font-size: 12px;
  color: #ffff;
}
.list-box {
  border-bottom: 1px solid #e1e1e1;
}
.pad {
  padding: 2px;
}
.warn {
  height: 18px;
  width: 28px;
  margin-left: 6px;
  border: 1px solid gray;
  border-radius: 12px 12px;
  font-size: 8px;
  color: red;
}
.promise {
  height: 18px;
  width: 28px;
  margin-left: 6px;
  border: 1px solid gray;
  border-radius: 12px 12px;
  font-size: 8px;
  color: purple;
}
.reject {
  height: 18px;
  width: 28px;
  margin-left: 6px;
  border: 1px solid gray;
  border-radius: 12px 12px;
  font-size: 8px;
  color: rgb(0, 183, 255);
}
.white-bg {
  background-color: #ffffff;
}
.flex-style {
  display: flex;
}
.label {
  font-size: 12px;
  color: #000000;
}
.value {
  font-size: 12px;
  color: #bfbfbf;
}
.mar-r-b {
  margin: 8px;
}
.mar-l {
  margin: 6px;
}
.van-bottom-line {
  border-bottom: 1px solid #e1e1e1;
}
.proj-name {
  font-size: 14px;
  font-weight: bold;
}
.btn-style {
  display: flex;
  justify-content: flex-end;
  right: 0;
  text-align: center;
  /* position: fixed;
   top: 0;
  right: 0;
  bottom: 0;  */
}
.btn {
  width: 50px;
  height: 25px;
  line-height: 25px;
  border-radius: 8px;
  font-size: 10px;
  color: #ffffff;
  background-color: rgb(0, 183, 255);
}
</style>
