<template>
  <div>
    <file-uploader></file-uploader>
    <client-only>
      <uploader class="uploader-example">
        <uploader-drop>
          <p>Drop files here to upload or</p>
          <uploader-btn>select files</uploader-btn>
          <uploader-btn :directory="true">select files</uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FileUploader from '@/pages/_components/FileUploader/FileUploader.vue'
@Component({
  components: { FileUploader },
})
export default class upload extends Vue {}
</script>

<style>
.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
