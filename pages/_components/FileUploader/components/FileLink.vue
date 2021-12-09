<template>
  <el-input v-model="input" placeholder="提供链接" style="width: 300px" @keyup.enter.native="onSubmit">
    <el-button slot="append" icon="el-icon-check" @click="onSubmit"></el-button>
  </el-input>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import FileUploaderInject from '@/pages/_components/FileUploader/FileUploaderInject.vue'

@Component
export default class FileLink extends FileUploaderInject {
  input = ''

  onSubmit(): void {
    if (/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(this.input)) {
      this.FileUploader.addFiles(this.input)
      this.input = ''
    } else {
      this.$message.error('请输入正确的文件链接')
    }
  }
}
</script>
