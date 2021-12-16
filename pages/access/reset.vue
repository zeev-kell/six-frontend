<template>
  <div class="reset-container">
    <div class="box">
      <h1 class="text-center">密码重置</h1>
      <el-form ref="form" size="large" :model="form" :rules="rules" @submit.native.prevent>
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码，长度在6到20个字符" type="password" />
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码">
            <el-button slot="append" native-type="button" :disabled="isDisabledCode" @click="onClickGetCode">
              {{ loadingCodeText }}
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <loading-button class="el-button--block" round type="primary" native-type="submit" :callback="reset"> 提交 </loading-button>
        </el-form-item>
        <el-form-item>
          <div class="text-right">
            <span class="text-muted">已有账号？</span>
            <nuxt-link :to="localePath('access')"> 立即登录</nuxt-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  components: { LoadingButton },
})
export default class ResetPage extends Vue {
  $refs!: {
    form: HTMLFormElement
  }
  form = {
    email: '',
    password: '',
    code: '',
  }

  isDisabledCode = false
  loadingCodeText = '获取验证码'

  rules = {
    email: [{ required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
  }

  onClickGetCode(): void {
    if (this.isDisabledCode) {
      return
    }
    this.$refs.form.validateField('email', (error: string) => {
      if (error === '') {
        this.isDisabledCode = true
        this.$$axios
          .$post('/v1/user/security/getcode', { email: this.form.email })
          .then(() => {
            this.$message.success('验证码已发送，请注意查收...')
            this.loadingCodeText = '发送成功'
            let time = 60
            const timeout = setInterval(() => {
              time--
              this.loadingCodeText = `重发(${time}s)`
              if (time < 0) {
                this.isDisabledCode = false
                this.loadingCodeText = '获取验证码'
                clearInterval(timeout)
              }
            }, 1000)
          })
          .catch(() => {
            this.isDisabledCode = false
            this.loadingCodeText = '获取验证码'
          })
      }
    })
  }

  async reset(): Promise<void> {
    await this.$refs.form.validate()
    await this.$$axios.$post('/v1/user/security', this.form).then(() => {
      this.$message.success('重置成功，正在跳转至登录...')
      setTimeout(() => {
        this.$I18nRouter.push('/access')
      }, 3000)
    })
  }
}
</script>
