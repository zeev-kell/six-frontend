<template>
  <el-dialog title="上传数据" :visible.sync="dialogVisible" width="80%" :close-on-click-modal="false" @closed="onDialogClosed">
    <file-uploader @on-complete="hadChanged = true"></file-uploader>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FileUploader from '@/pages/_components/FileUploader/FileUploader.vue'
@Component({
  components: { FileUploader },
})
export default class FileUploadDialog extends Vue {
  dialogVisible = false
  hadChanged = false

  onDialogClosed(): void {
    if (this.hadChanged) {
      this.$emit('change')
      this.hadChanged = false
    }
  }
}
</script>
