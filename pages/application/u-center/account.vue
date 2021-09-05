<template>
  <div class="card no-border">
    <div class="card-header">
      <h3 class="card-title mt-10">帐号密码</h3>
    </div>
    <div class="card-body el-row el-row--flex">
      <div class="el-col-12">
        <el-form label-position="top" :model="form">
          <el-form-item label="旧密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class account extends Vue {
  form = {
    password: '',
  }
}
</script>
