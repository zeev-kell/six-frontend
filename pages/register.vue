<template>
  <div class="container-fluid" style="padding: 1px">
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
          <!--          <el-form-item prop="phone">-->
          <!--            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="isLoading"
              class="el-button-block"
              round
              type="primary"
              native-type="submit"
              @click.prevent="register"
            >
              立即注册
            </el-button>
          </el-form-item>
          <el-form-item class="text-center mb-0 el-form_error_rl" prop="checked">
            <el-checkbox v-model="form.checked"> 注册即代表同意 </el-checkbox>
            <el-link type="primary" :underline="false" class="y-baseline" @click="outerVisible = true">
              《产品使用协议》
            </el-link>
          </el-form-item>
          <el-form-item>
            <div class="text-right">
              <span class="text-muted">已有账号？</span>
              <router-link to="login">立即登录</router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="text-center mt-30">© 2021 Six O'Clock. All Rights Reserved.</div>
      <el-dialog
        title="产品使用协议"
        :visible.sync="outerVisible"
        center
        width="80%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
      >
        <div v-marked="UserAgreement"></div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" style="width: 200px" @click="outerVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <canvas-particle></canvas-particle>
  </div>
</template>
<script>
  import CanvasParticle from '@/components/CanvasParticle'
  import marked from '@/directives/marked'
  import axios from 'axios'

  export default {
    directives: {
      ...marked,
    },
    components: {
      CanvasParticle,
    },
    async asyncData() {
      const response = await axios.get('/user-agreement.md')
      return {
        UserAgreement: response.data,
      }
    },
    data() {
      return {
        form: {
          username: '',
          password: '',
          surepassword: '',
          // phone: '',
          email: '',
          checked: false,
        },
        isLoading: false,
        rules: {
          username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
          password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
          surepassword: [
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'))
                } else if (value !== this.form.password) {
                  callback(new Error('两次输入密码不一致!'))
                } else {
                  callback()
                }
              },
              trigger: 'blur',
            },
          ],
          phone: [
            {
              required: true,
              pattern: /^0{0,1}(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/,
              message: '手机号格式不正确',
              trigger: ['change', 'blur'],
            },
          ],
          email: [{ required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
          checked: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (value === false) {
                  callback(new Error('请同意产品使用协议'))
                } else {
                  callback()
                }
              },
            },
          ],
        },
        outerVisible: false,
        UserAgreement: undefined,
      }
    },
    methods: {
      register() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.isLoading = true
            this.$$axios
              .$post('/register', {
                username: this.form.username,
                password: this.form.password,
                // phone: this.form.phone,
                email: this.form.email,
              })
              .then(() => {
                this.$message.success('注册成功，正在跳转至登录...')
                setTimeout(() => {
                  this.$router.push('/login')
                }, 3000)
              })
              .finally(() => {
                this.isLoading = false
              })
          }
        })
      },
    },
  }
</script>
<style lang="scss">
  .register-container {
    width: 400px;
    margin: 50px auto 0;
  }

  .register-box {
    border: 1px solid #eceff1;
    border-radius: 2px;
    padding: 30px 50px;
    background: #ffffff;
    position: relative;
    z-index: 1;
  }
</style>
