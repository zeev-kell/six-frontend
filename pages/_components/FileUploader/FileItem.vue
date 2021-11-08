<template>
  <div class="file-uploader-item">
    <div class="el-row">
      <div class="el-col-4">
        <el-input v-model="item.name" placeholder="请输入内容"></el-input>
      </div>
      <div class="el-col-2">
        <el-input v-model="item.mediaType" placeholder="请输入内容"></el-input>
      </div>
      <div class="el-col-2">
        <el-input v-model="item.label" placeholder="请输入内容"></el-input>
      </div>
      <div class="el-col-4">
        <div v-if="item.loading" class="el-icon-loading"></div>
        <div v-else>{{ item.hash }}</div>
      </div>
      <div class="el-col-2">
        <el-select v-model="item.encoding" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
      <div class="el-col-4">
        <el-input v-model="item.description" type="textarea" :rows="1" placeholder="请输入内容"> </el-input>
      </div>
      <div class="el-col-2">
        <el-button type="text" title="删除" @click="onRemove">
          <i class="el-icon-close text-danger"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import UFile from '@/pages/_components/FileUploader/UFile'
import FileUploaderMixin from '@/pages/_components/FileUploader/FileUploaderMixin.vue'

@Component
export default class FileUploaderItem extends FileUploaderMixin {
  @Prop({
    required: true,
  })
  item!: UFile

  options = this.FileUploader.options

  async onRemove(): Promise<void> {
    if (!this.item.isDone()) {
      await this.$confirm('该文件还没有上传完成, 是否继续删除?', '提示', {
        type: 'warning',
      })
    }
    this.FileUploader.removeFile(this.item)
  }
}
</script>
