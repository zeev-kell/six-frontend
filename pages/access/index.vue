<template>
  <div class="login-container">
    <div class="box">
      <h1 class="text-center">六点了技术</h1>
      <el-form ref="form" size="large" :model="form" :rules="rules" @submit.native.prevent>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-form-item>
          <loading-button class="el-button-block" round type="primary" native-type="submit" :callback="onSubmit"> 登录 </loading-button>
        </el-form-item>
        <el-form-item>
          <div class="el-row el-row--flex">
            <div class="el-col-full">
              <nuxt-link :to="localePath('access-reset')"> 忘记密码 </nuxt-link>
            </div>
            <div class="el-col-auto">
              <div class="text-right">
                <span class="text-muted">没有账号？</span>
                <nuxt-link :to="localePath('access-register')"> 立即注册 </nuxt-link>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <copyright />
  </div>
</template>

<script lang="ts">
import { Action, Component, Vue } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'
import Copyright from '@/components/Copyright.vue'

@Component({
  components: {
    LoadingButton,
    Copyright,
  },
})
export default class access extends Vue {
  $refs!: {
    form: HTMLFormElement
  }
  form = {
    username: '',
    password: '',
  }
  rules = {
    username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  }
  @Action('user/ACTION_LOGIN')
  ACTION_LOGIN!: (data: any) => Promise<void>
  async onSubmit(): Promise<void> {
    await this.$refs.form.validate()
    await this.$store.dispatch('user/ACTION_LOGIN', this.form)
  }
}
</script>
