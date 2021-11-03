<template>
  <div class="el-row">
    <div class="el-col-4">{{ file.name }}</div>
    <div class="el-col-2">{{ file.mediatype }}</div>
    <div class="el-col-2">{{ file.bytes }}</div>
    <div class="el-col-4">{{ file.hash }}</div>
    <div class="el-col-2">{{ file.encoding }}</div>
    <div class="el-col-4">{{ file.description }}</div>
    <div class="el-col-2">
      <el-button type="danger" size="mini" title="删除" icon="el-icon-delete"></el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import UFile from '@/pages/_components/FileUploader/components/UFile'
import FileUploaderMixin from '@/pages/_components/FileUploader/FileUploaderMixin.vue'

@Component
export default class UploaderFile extends FileUploaderMixin {
  @Prop({
    required: true,
  })
  file!: UFile
}
</script>
