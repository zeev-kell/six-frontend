<template>
  <div class="card no-border">
    <div class="card-header">
      <h3 class="card-title mt-10">安全设置</h3>
    </div>
    <div class="card-body el-row el-row--flex">
      <div class="el-col-12">
        <el-form label-position="top" :model="form">
          <el-form-item label="显示昵称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="form.description" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SecurityPage extends Vue {}
</script>
