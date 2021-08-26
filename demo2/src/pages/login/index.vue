<template>
  <div class="login-container">
    <div class="login-form">
      <el-form :label-position="labelPosition"
               v-model="formLabelAlign">
        <el-form-item style="font-family: '华文行楷'; font-size: 20px;">
          <el-input v-model="user.id"></el-input>
        </el-form-item>
        <el-form-item style="font-family: '华文行楷'; font-size: 20px;"
                      label>
          <el-input v-model="user.password"></el-input>
        </el-form-item>
        <el-button type="info"
                   @click="login"
                   plain><span style="font-family: '华文行楷'; font-size: 18px;">登陆</span></el-button>
        <el-button type="info"
                   @click="pagetoregister()"
                   plain><span style="font-family: '华文行楷'; font-size: 18px;">注册</span></el-button>
      </el-form>
    </div>
    <!-- <el-row> -->
    <!-- <div style="height: 60px;"></div>
      <div style="align-content: center;">
        <span style="font-family: '华文行楷';">
          <h1>学生信息管理系统</h1>
        </span>
        <hr />
        <div class="grid-content bg-purple"
             style="width: 300px; margin: auto; ">

          <el-form :label-position="labelPosition"
                   v-model="formLabelAlign">
            <el-form-item style="font-family: '华文行楷'; font-size: 20px;"
                          label="用户名:">
              <el-input v-model="user.id"></el-input>
            </el-form-item>
            <el-form-item style="font-family: '华文行楷'; font-size: 20px;"
                          label="密码:">
              <el-input v-model="user.password"></el-input>
            </el-form-item>
            <el-button type="info"
                       @click="login"
                       plain><span style="font-family: '华文行楷'; font-size: 18px;">登陆</span></el-button>
            <el-button type="info"
                       @click="pagetoregister()"
                       plain><span style="font-family: '华文行楷'; font-size: 18px;">注册</span></el-button>
          </el-form>
        </div>
      </div> -->
    <!-- </el-row> -->
  </div>
</template>

<script>
import axios from 'axios'
// import qs from 'qs'
export default {
  name: 'login',
  data () {
    return {
      labelPosition: 'left',
      formLabelAlign: {},
      user: {
        id: '',
        password: ''
      }
    }
  },
  created () {
    this.clearSession()
  },
  methods: {
    // 登陆
    login () {
      console.log(1)
      this.$router.push('/uploadBtn')
    },
    clearSession: function () {
      var that = this
      axios.post('/exit').then(function (result) {
        console.log(result)
        that.$router.push({
          name: 'pagetologin'
        })
      })
    }
  }
}
</script>
<style>
.el-input__inner {
  background-color: #e8f0f1;
}
/* html,
body {
  height: 100%;
  overflow-y: hidden;
}
#app {
  height: 100%;
} */
</style>
<style lang="scss" scoped >
.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/loginBackground.png") no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .login-form {
    // 绝对定位
    position: absolute;
    top: 40%;
    right: 40%;
    padding: 50px;
    width: 300px;
    background-color: #fff;
  }
}
</style>
