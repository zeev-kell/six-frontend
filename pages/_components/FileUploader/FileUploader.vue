<template>
  <div>
    <uploader-drop>
      <p>Drop files here to upload or</p>
      <uploader-btn>Select File</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </div>
</template>

<script lang="ts">
import { Component, Prop, ProvideReactive, Vue } from 'nuxt-property-decorator'
import UploaderDrop from './UploaderDrop.vue'
import UploaderBtn from './UploaderBtn.vue'
import UploaderList from './UploaderList.vue'
import Uploader from './components/uploader.js'

@Component({
  components: { UploaderList, UploaderBtn, UploaderDrop },
})
export default class FileUploader extends Vue {
  @ProvideReactive('FileUploader')
  FileUploader = this
  @Prop({
    default() {
      return {}
    },
  })
  options!: any

  uploader!: Uploader
  files = []
  fileList = []

  created(): Promise<any> | void {
    this.uploader = new Uploader(this.options)
  }
  destroyed(): void {
    ;(this.uploader as any) = null
  }
}
</script>
