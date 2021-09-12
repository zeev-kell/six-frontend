<template>
  <div class="card no-border">
    <div class="card-header">
      <h3 class="card-title mt-10">帐号密码</h3>
    </div>
    <div class="card-body el-row el-row--flex">
      <div class="el-col-12">
        <el-form ref="form" label-position="top" :model="form" :rules="rules" @submit.native.prevent>
          <el-form-item label="旧密码" prop="old_password">
            <el-input v-model="form.old_password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_password">
            <el-input v-model="form.new_password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="con_password">
            <el-input v-model="form.con_password"></el-input>
          </el-form-item>
          <el-form-item>
            <loading-button :callback="onSubmit" type="primary" native-type="submit">确定</loading-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'
@Component({
  components: { LoadingButton },
})
export default class AccountPage extends Vue {
  $refs!: {
    form: HTMLFormElement
  }

  form = {
    old_password: '',
    new_password: '',
    con_password: '',
  }
  rules = {
    old_password: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
    new_password: [
      { required: true, message: '新密码不能为空', trigger: 'blur' },
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
    con_password: [
      {
        validator: (rule: never, value: string, callback: (e?: Error) => void) => {
          if (!this.form.new_password) {
            return callback()
          }
          if (this.form.new_password !== value) {
            return callback(new Error('两次密码不一致'))
          }
          callback()
        },
        trigger: 'blur',
      },
    ],
  }

  async onSubmit(): Promise<void> {
    await this.$refs.form.validate()
    await this.$api.user.updatePassword({
      old_password: this.form.old_password,
      new_password: this.form.new_password,
    })
  }
}
</script>
