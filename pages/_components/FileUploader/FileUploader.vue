<template>
  <div>
    <uploader-drop>
      <p>Drop files here to upload or</p>
      <div class="el-row--flex">
        <uploader-btn>文件</uploader-btn>
        <uploader-btn :directory="true">文件夹</uploader-btn>
        <el-button @click="onUpload()">开始上传</el-button>
      </div>
      <uploader-list></uploader-list>
    </uploader-drop>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import UploaderBtn from '@/pages/_components/FileUploader/UploaderBtn.vue'
import FileUploaderHelper from '@/pages/_components/FileUploader/FileUploaderHelper.vue'
import UploaderDrop from '@/pages/_components/FileUploader/UploaderDrop.vue'
import UploaderList from '@/pages/_components/FileUploader/UploaderList.vue'

@Component({
  components: { UploaderList, UploaderDrop, UploaderBtn },
  provide() {
    return {
      FileUploader: this,
    }
  },
  data() {
    return {
      uploader: null,
    }
  },
})
export default class FileUploader extends FileUploaderHelper {}
</script>
