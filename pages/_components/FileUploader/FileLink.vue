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
    this.FileUploader.addFiles(this.input)
    this.input = ''
  }
}
</script>
