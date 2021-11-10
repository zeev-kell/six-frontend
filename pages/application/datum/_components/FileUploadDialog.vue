<template>
  <el-dialog title="上传数据" :visible.sync="dialogVisible" top="5vh" width="80%" :close-on-click-modal="false" @closed="onDialogClosed">
    <div>
      <file-drop class="text-center mb-10">
        <file-btn :multiple="isMultiple">文件</file-btn>
        <file-btn v-if="isMultiple" :directory="true">文件夹</file-btn>
        <span class="mx-5">或</span>
        <file-link></file-link>
        <p>只能上传不超过2M的文件</p>
      </file-drop>
      <file-list v-show="hasFile"></file-list>
    </div>
    <div v-show="hasFile" slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onUpload()">开始上传</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import FileUploader from '@/pages/_components/FileUploader/FileUploader.vue'
import FileUploaderMixin from '@/pages/_components/FileUploader/FileUploaderMixin.vue'
import FileDrop from '@/pages/_components/FileUploader/FileDrop.vue'
import FileBtn from '@/pages/_components/FileUploader/FileBtn.vue'
import FileLink from '@/pages/_components/FileUploader/FileLink.vue'
import FileList from '@/pages/_components/FileUploader/FileList.vue'
import { Prop } from 'vue-property-decorator'
import { DatumModel } from '@/types/model/Datum'

@Component({
  components: { FileList, FileLink, FileBtn, FileDrop, FileUploader },
})
export default class FileUploadDialog extends FileUploaderMixin {
  @Prop({
    default() {
      return false
    },
  })
  isMultiple!: boolean

  dialogVisible = false
  hadChanged = false

  async onShowDialog(): Promise<void> {
    this.dialogVisible = true
    if (this.options.length === 0) {
      const options = await this.$api.datum.getFormatList()
      this.options = options.map((o: DatumModel) => ({
        value: o.resource_id,
        label: o.name,
      }))
    }
  }
  onDialogClosed(): void {
    if (this.hadChanged) {
      this.$emit('change')
      this.hadChanged = false
    }
  }
  created() {
    this.opts.singleFile = !this.isMultiple
    this.$on('upload.file.success', () => {
      this.hadChanged = true
    })
  }
}
</script>
