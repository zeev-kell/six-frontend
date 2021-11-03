<template>
  <div class="uploader-list">
    <div class="el-row">
      <div class="el-col-4">文件名称</div>
      <div class="el-col-2">媒介类型</div>
      <div class="el-col-2">大小</div>
      <div class="el-col-4">MD5校验码</div>
      <div class="el-col-2">格式规范</div>
      <div class="el-col-4">说明</div>
      <div class="el-col-2">操作</div>
    </div>
    <u-c-file v-for="row of tableData" :key="row.id" :file="row"></u-c-file>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import UCFile from '@/pages/_components/FileUploader/UCFile.vue'
import UploaderMixin from './FileUploaderMixin.vue'
import UploaderFile from './UCFile.vue'

@Component({
  components: { UCFile, UploaderFile },
})
export default class UploaderList extends UploaderMixin {
  get fileList(): any[] {
    return this.FileUploader?.fileList
  }
  get tableData(): any[] {
    return this.fileList.map((file) => {
      return {
        id: file.id,
        name: file.name,
        bytes: Math.random() * 100,
        mediatype: 'text/plain',
        description: 'description',
        encoding: 'utf-8',
        hash: 'cb3a0f860884309220f3958fd13a3ed2',
        path: 'exampledir/d2753fff-c7d7-49c6-95af-dcc0895883d3',
      }
    })
  }
}
</script>
