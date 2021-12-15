<template>
  <div class="register-container">
    <div class="box">
      <h1 class="text-center">六点了技术</h1>
      <el-form ref="form" size="large" :model="form" :rules="rules" @submit.native.prevent>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号，长度在6到20个字符" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码，长度在6到20个字符" type="password" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码">
            <el-button slot="append" :disabled="isDisabledCode" @click="onClickGetCode">
              {{ loadingCodeText }}
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <loading-button class="el-button--block" round type="primary" native-type="submit" :callback="register"> 立即注册 </loading-button>
        </el-form-item>
        <el-form-item class="text-center mb-0 el-form_error_rl" prop="checked">
          <el-checkbox v-model="form.checked"> 注册即代表同意 </el-checkbox>
          <el-link type="primary" :underline="false" class="v-baseline" @click="showUserAgreement()"> 《产品使用协议》 </el-link>
        </el-form-item>
        <el-form-item>
          <div class="text-right">
            <span class="text-muted">已有账号？</span>
            <nuxt-link :to="localePath('access')"> 立即登录 </nuxt-link>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <copyright />
    <el-dialog
      title="产品使用协议"
      :visible.sync="showUAVisible"
      center
      top="5vh"
      width="80%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div v-marked="userAgreement" v-loading="loadingUA" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" style="width: 200px" @click="showUAVisible = false"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Copyright from '@/components/Copyright.vue'
import marked from '@/directives/marked/marked'
import axios from 'axios'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  scrollToTop: true,
  components: {
    LoadingButton,
    Copyright,
  },
  directives: {
    ...marked,
  },
})
export default class RegisterPage extends Vue {
  $refs!: {
    form: HTMLFormElement
  }

  form = {
    username: '',
    password: '',
    email: '',
    code: '',
    checked: false,
  }

  rules = {
    username: [
      { required: true, message: '账号不能为空', trigger: 'blur' },
      { min: 6, message: '长度在6到20个字符', trigger: 'blur' },
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validator: (rule: never, value: string, callback: (e?: Error) => void) => {
          if (!/^[a-zA-Z0-9_-]{6,20}$/.test(value)) {
            callback(new Error('至少6个字符（字母，数字，下划线）'))
          } else {
            callback()
          }
        },
        trigger: 'blur',
      },
    ],
    password: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { min: 6, message: '长度在 6 到 20 个字符', trigger: 'blur' },
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validator: (rule: never, value: string, callback: (e?: Error) => void) => {
          // 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
          // const reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
          const flag = [/[a-zA-Z]/, /[0-9]/, /[!@#$%^&*?.]/].map((r) => r.test(value)).filter((r) => r)
          if (flag.length < 2) {
            callback(new Error('至少包含字母、数字和特殊字符(半角)中的两种'))
          } else {
            callback()
          }
        },
        trigger: 'blur',
      },
    ],
    email: [{ required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
    code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
    checked: [
      {
        required: true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validator: (rule: never, value: boolean, callback: (e?: Error) => void) => {
          if (!value) {
            callback(new Error('请同意产品使用协议'))
          } else {
            callback()
          }
        },
      },
    ],
  }

  showUAVisible = false
  userAgreement = null
  isDisabledCode = false
  loadingCodeText = '获取验证码'
  loadingUA = false

  async register(): Promise<void> {
    await this.$refs.form.validate()
    await this.$$axios
      .$post('/v1/register', {
        username: this.form.username,
        password: this.form.password,
        // phone: this.form.phone,
        email: this.form.email,
        code: this.form.code,
      })
      .then(() => {
        this.$message.success('注册成功，正在跳转至登录...')
        setTimeout(() => {
          this.$I18nRouter.push('/access')
        }, 3000)
      })
  }

  onClickGetCode(): void {
    if (this.isDisabledCode) {
      return
    }
    this.$refs.form.validateField('email', (error: string) => {
      if (error === '') {
        this.isDisabledCode = true
        this.$$axios
          .$post('/v1/register/getcode', { email: this.form.email })
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

  async showUserAgreement(): Promise<void> {
    if (this.userAgreement === null) {
      this.loadingUA = true
      const response = await axios.get('/user-agreement.md')
      this.userAgreement = response.data
      this.loadingUA = false
    }
    this.showUAVisible = true
  }
}
</script>

<style lang="scss">
.register-container {
  width: 400px;
  margin: 30px auto 0;

  .el-form_error_rl .el-form-item__content {
    line-height: 20px;
  }
}

.register-box {
  border: 1px solid #eceff1;
  border-radius: 2px;
  padding: 20px 50px 10px;
  background: #ffffff;
  position: relative;
  z-index: 1;
}
</style>
