﻿<template>
  <div class="file-list border p-10">
    <div class="file-list__header">
      <div class="el-row row">
        <div class="el-col el-col-3">文件名称<span class="text-danger">*</span></div>
        <div class="el-col el-col-3">媒介类型</div>
        <div class="el-col el-col-3">标签</div>
        <div class="el-col el-col-2">大小</div>
        <div class="el-col el-col-5">MD5校验码</div>
        <div class="el-col el-col-3">格式规范</div>
        <div class="el-col el-col-3">说明</div>
        <div class="el-col el-col-2"></div>
      </div>
    </div>
    <div class="file-list-body">
      <file-item v-for="uFile of fileList" :key="uFile.id" :item="uFile"></file-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import FileItem from '@/pages/_components/FileUploader/components/FileItem.vue'
import FileUploaderInject from '@/pages/_components/FileUploader/FileUploaderInject.vue'
import UFile from '@/pages/_components/FileUploader/components/UFile'

@Component({
  components: { FileItem },
})
export default class FileUploaderList extends FileUploaderInject {
  get fileList(): UFile[] {
    return this.FileUploader?.files || []
  }
}
</script>

<style lang="scss" scoped>
.file-list__header {
  .el-col {
    padding-left: 1px;
    padding-right: 1px;
  }
}
.file-list-body {
  max-height: 200px;
  overflow-y: auto;
}
.file-list ::v-deep {
  .row {
    border-bottom: 1px solid rgb(235, 238, 245);
  }
  .el-col {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .el-form-item {
    margin: 0;
    padding-left: 1px;
    padding-right: 1px;
  }
  input {
    padding: 0 5px;
    border-color: transparent;
    &:focus {
      border-color: #dcdfe6;
    }
  }
}
</style>
