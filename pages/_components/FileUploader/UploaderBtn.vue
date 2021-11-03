<template>
  <div>
    <el-button type="primary" @click="onOpenSelect"><slot></slot></el-button>
    <input ref="input" type="file" style="visibility: hidden; position: absolute; width: 1px; height: 1px" @change="onChangeFile" />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import FileUploaderMixin from './FileUploaderMixin.vue'

@Component
export default class UploaderBtn extends FileUploaderMixin {
  $refs!: {
    input: HTMLInputElement
  }
  @Prop({ default: false })
  multiple!: boolean
  @Prop({ default: false })
  directory!: boolean
  @Prop({
    default() {
      return {}
    },
  })
  attrs!: any

  onOpenSelect(): void {
    this.$refs.input.click()
  }
  onChangeFile(e: Event): void {
    if ((e.target as HTMLInputElement).value) {
      this.FileUploader.addFiles!((e.target as HTMLInputElement)!.files, e)
      ;(e.target as HTMLInputElement).value = ''
    }
  }

  mounted(): Promise<any> | void {
    const input = this.$refs.input
    if (this.multiple) {
      input.setAttribute('multiple', 'multiple')
    }
    if (this.directory) {
      input.setAttribute('webkitdirectory', 'webkitdirectory')
    }
    Object.keys(this.attrs).forEach((key) => {
      input.setAttribute(key, this.attrs[key])
    })
  }
}
</script>
