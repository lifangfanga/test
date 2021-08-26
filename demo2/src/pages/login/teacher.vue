<template>
  <div class="login">
    <el-form :model="ruleForm"
             ref="ruleForm"
             :rules="rules">
      <el-form-item label="账号"
                    prop="number">
        <el-input type="number"
                  v-model="ruleForm.numbers"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="ruleForm.password"> </el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary"
               @click="login">教师登录</el-button>
    <el-button type=""
               @click="route"></el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rulesForm: {
        number: '',
        password: ''
      },
      rules: {
        number: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$loading.show()
      this.$dialog.confirm({
        message: '是否自动更新CT配比值？',
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(() => {

      })
      login({
        number: this.rulesForm.number,
        password: this.rulesForm.password
      }).then(res => {
        if (res.status === 200) {
          this.$router.push('/')
          this.$loading.hide()
        } else {
          this.$toast('登录失败')
        }
      })
    },
    viewResult () {
      // 先加载
      this.$loading.show()
      // 调后台接口
      viewResult({ proId: this.proId }).then(res => {
        const data = res.data
        if (res.status === 200) {
          this.formData.forEach(v => {
            if (v.prop === 'lnrjrn') {
              v.valueName = data.lnrjrnName
            }
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
