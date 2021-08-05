<template>
  <div class="container-fluid" style="padding: 1px">
    <div class="login-container">
      <div class="login-box">
        <h1 class="text-center">六点了技术</h1>
        <el-form ref="form" size="large" :model="form" :rules="rules" @submit.native.prevent>
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <loading-button class="el-button-block" round type="primary" native-type="submit" :callback="onSubmit">登录</loading-button>
          </el-form-item>
          <el-form-item>
            <div class="text-right">
              <span class="text-muted">没有账号？</span>
              <nuxt-link :to="localePath('register')">立即注册</nuxt-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <copyright />
    </div>
    <canvas-particle></canvas-particle>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Action, namespace } from 'nuxt-property-decorator'
import CanvasParticle from '@/components/CanvasParticle.vue'
import Copyright from '@/components/Copyright.vue'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  scrollToTop: true,
  components: {
    LoadingButton,
    Copyright,
    CanvasParticle,
  },
  middleware: ['check-login'],
})
export default class LoginPage extends Vue {
  $refs!: {
    form: HTMLFormElement
  }

  @Action('ACTION_LOGIN')
  ACTION_LOGIN!: (form: { username: string; password: string }) => Promise<void>

  form = {
    username: '',
    password: '',
  }

  rules = {
    username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  }

  async onSubmit(): Promise<void> {
    await this.$refs.form.validate()
    await this.ACTION_LOGIN(this.form)
  }
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
