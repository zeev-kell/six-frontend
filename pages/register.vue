<template>
  <div class="register-container">
    <div class="register-box">
      <h1 class="text-center">six o'clock</h1>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="surepassword">
          <el-input v-model="form.surepassword" placeholder="再次输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="el-button-block" round type="primary" @click="register">立即注册</el-button>
        </el-form-item>
        <el-form-item>
          <div class="text-right">
            <span class="text-muted">已有账号，</span>
            <router-link to="login">立即登录</router-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="text-center mt-30">© 2020 Six O'Clock. All Rights Reserved.</div>
  </div>
</template>
<script>
  export default {
    name: 'Register',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          username: '',
          password: '',
          surepassword: '',
          phone: '',
          email: '',
        },
        rules: {
          username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
          password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
          surepassword: [{ validator: validatePass, trigger: 'blur' }],
          phone: [
            {
              pattern: /^0{0,1}(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/,
              message: '手机号格式不正确',
              trigger: ['change', 'blur'],
            },
          ],
          email: [
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change'],
            },
          ],
        },
      }
    },
    methods: {
      register() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$api
              .post('register', {
                username: this.form.username,
                password: this.form.password,
                phone: this.form.phone,
                email: this.form.email,
                extra: 'extra',
              })
              .then((e) => {})
          }
        })
      },
    },
  }
</script>
<style>
  .register-container {
    width: 400px;
    margin: 50px auto 0;
  }

  .register-box {
    border: 1px solid #eceff1;
    border-radius: 2px;
    padding: 30px 50px;
  }
</style>
