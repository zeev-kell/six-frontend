<template>
  <div class="login">
    <el-card class="card">
      <div class="title">sixoclock</div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-bt" type="primary" round @click="login"
            >登 录</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button class="left-bt" type="text" @click="register"
            >立即注册</el-button
          >
          <!-- <el-button class="right-bt" type="text" >忘记密码</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    login() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$api
            .post('login', {
              username: this.form.username,
              password: this.form.password,
            })
            .then((res) => {
              console.log(res)
            })
        }
      })
    },
    register() {
      this.$router.push('/register')
    },
  },
}
</script>
<style scoped>
.card {
  width: 360px;
  position: absolute;
  bottom: 10%;
  right: 100px;
  padding: 0 40px;
  box-sizing: border-box;
}
.title {
  font-size: 42px;
  font-weight: 400;
  margin-bottom: 60px;
}
.login-bt {
  width: 100%;
}
.left-bt {
  float: left;
  color: #666;
}
.right-bt {
  float: right;
  color: #666;
}
</style>
