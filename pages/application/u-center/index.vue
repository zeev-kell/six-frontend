<template>
  <div class="card no-border">
    <div class="card-header">
      <h3 class="card-title mt-10">个人信息</h3>
    </div>
    <div class="card-body el-row el-row--flex">
      <div class="el-col-12">
        <el-form label-position="top" :model="form">
          <el-form-item label="显示昵称">
            <el-input v-model="form.name" placeholder="给自己起个好听的昵称"></el-input>
          </el-form-item>
          <el-form-item label="公开邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="form.description" type="textarea" :rows="5"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class UCenterIndex extends Vue {
  form = {
    name: '',
    email: '',
    description: '',
    avatarUrl: '/images/portrait.jpg',
  }
  mounted(): void {
    this.form.name = this.$store.getters['user/username']
    this.form.avatarUrl = '/images/portrait.jpg'
  }
}
</script>
