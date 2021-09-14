<template>
  <div class="card no-border">
    <div class="card-header">
      <h3 class="card-title mt-10">个人信息</h3>
    </div>
    <div class="card-body el-row el-row--flex">
      <div class="el-col-12">
        <el-form ref="form" size="mini" label-position="top" :model="form" @submit.native.prevent>
          <el-form-item label="显示昵称">
            <el-input v-model="form.nickname" placeholder="给自己起个好听的昵称"></el-input>
          </el-form-item>
          <el-form-item label="公开邮箱">
            <el-input v-model="form.public_email"></el-input>
          </el-form-item>
          <el-form-item label="手机帐号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="form.description" type="textarea" :rows="5"></el-input>
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
import { mapState } from 'vuex'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  components: { LoadingButton },
  computed: {
    ...mapState('user', ['username', 'email', 'avatar_url']),
  },
})
export default class UCenterIndex extends Vue {
  $refs!: {
    form: HTMLFormElement
  }

  form = {
    nickname: '',
    public_email: '',
    description: '',
    phone: '',
    avatarUrl: '/images/portrait.jpg',
  }
  mounted(): void {
    Object.keys(this.form).forEach((key: string) => {
      ;(this.form as any)[key] = this.$store.state.user[key]
    })
  }

  async onSubmit(): Promise<void> {
    await this.$refs.form.validate()
    await this.$api.user.updateInfo(this.form)
    this.$message.success('更新成功')
  }
}
</script>
