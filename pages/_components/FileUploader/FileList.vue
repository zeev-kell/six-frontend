<template>
  <div class="file-uploader-list m-10">
    <div class="file-uploader-list__header">
      <div class="el-row">
        <div class="el-col-4">文件名称</div>
        <div class="el-col-2">媒介类型</div>
        <div class="el-col-2">标签</div>
        <div class="el-col-4">MD5校验码</div>
        <div class="el-col-2">格式规范</div>
        <div class="el-col-4">说明</div>
        <div class="el-col-2"></div>
      </div>
    </div>
    <div class="file-uploader-list-body" style="height: 200px; overflow-y: auto">
      <file-item v-for="uFile of fileList" :key="uFile.id" :item="uFile"></file-item>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import FileItem from '@/pages/_components/FileUploader/FileItem.vue'
import FileUploaderMixin from '@/pages/_components/FileUploader/FileUploaderMixin.vue'
import UFile from '@/pages/_components/FileUploader/UFile'

@Component({
  components: { FileItem },
})
export default class FileUploaderList extends FileUploaderMixin {
  get fileList(): UFile[] {
    return this.FileUploader?.files || []
  }
}
</script>
