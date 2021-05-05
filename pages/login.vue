<template>
  <div class="container-fluid" style="padding: 1px">
    <div class="login-container">
      <div class="login-box">
        <h1 class="text-center">六点了技术</h1>
        <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent>
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="isLoading"
              class="el-button-block"
              round
              type="primary"
              native-type="submit"
              @click.prevent="onSubmit"
            >
              登 录
            </el-button>
          </el-form-item>
          <el-form-item>
            <div class="text-right">
              <span class="text-muted">没有账号？</span>
              <nuxt-link to="register">立即注册</nuxt-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <canvas-particle></canvas-particle>
  </div>
</template>
<script type="text/babel">
  import CanvasParticle from '@/components/CanvasParticle'
  import { mapActions } from 'vuex'

  export default {
    components: {
      CanvasParticle,
    },
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        isLoading: false,
        rules: {
          username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
          password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        },
      }
    },
    created() {
      if (this.$auth.loggedIn) {
        this.$router.push('/application')
      }
    },
    methods: {
      ...mapActions(['login']),
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.isLoading = true
            this.login(this.form).finally(() => {
              this.isLoading = false
            })
          }
        })
      },
    },
  }
</script>
<style scoped lang="scss">
  .login-container {
    width: 400px;
    margin: 50px auto 0;
  }

  .login-box {
    border: 1px solid #eceff1;
    border-radius: 2px;
    padding: 30px 50px;
    background: #ffffff;
    position: relative;
    z-index: 1;
  }
</style>
