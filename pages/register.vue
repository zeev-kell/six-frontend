<template>
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
      <el-form-item prop="surepassword">
        <el-input
          v-model="form.surepassword"
          type="password"
          placeholder="再次输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="emial">
        <el-input v-model="form.emial" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-bt" type="primary" round @click="register"
          >立即注册</el-button
        >
      </el-form-item>
      <el-form-item>
        <div class="right-bt">
          <span class="prebt">已有账号</span
          ><el-button type="text" @click="login">立即登录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
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
        emial: '',
      },
      rules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ],
        surepassword: [{ validator: validatePass, trigger: 'blur' }],
        phone: [
          {
            pattern: /^0{0,1}(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/,
            message: '手机号格式不正确',
            trigger: ['change', 'blur'],
          },
        ],
        emial: [
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
        console.log(valid)
        if (valid) {
          this.$api
            .post('register', {
              username: this.form.username,
              password: this.form.password,
              phone: this.form.phone,
              emial: this.form.emial,
              extra: 'extra',
            })
            .then((res) => {
              console.log(res)
            })
        }
      })
    },
    login() {
      this.$router.push('/login')
    },
  },
}
</script>
<style scoped>
.card {
  width: 360px;
  position: absolute;
  top: 10%;
  padding: 0 40px;
  box-sizing: border-box;
  left: 50%;
  margin-left: -180px;
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
.prebt {
  font-size: 12px;
  color: #999;
  margin-right: 5px;
}
.right-bt {
  float: right;
}
</style>
