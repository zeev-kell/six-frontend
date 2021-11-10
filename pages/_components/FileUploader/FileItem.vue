<template>
  <el-form ref="ruleForm" :disabled="!item.canEdit" :inline="true" :rules="rules" :model="item" class="el-row" :show-message="false">
    <el-form-item class="el-col el-col-4" prop="name">
      <el-input v-model="item.name" placeholder="文件名称"></el-input>
    </el-form-item>
    <el-form-item class="el-col el-col-3">
      <el-input v-model="item.mediaType" placeholder="媒介类型"></el-input>
    </el-form-item>
    <el-form-item class="el-col el-col-3">
      <el-input v-model="item.label" placeholder="标签"></el-input>
    </el-form-item>
    <el-form-item class="el-col el-col-5">
      <el-form-item v-if="item.loading" class="el-icon-loading"></el-form-item>
      <el-form-item v-else class="text-truncate" :title="item.hash">{{ item.hash }}</el-form-item>
    </el-form-item>
    <el-form-item class="el-col el-col-3">
      <el-select v-model="item.encoding" placeholder="格式规范">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="el-col el-col-4">
      <el-input v-model="item.description" placeholder="说明"></el-input>
    </el-form-item>
    <el-form-item class="el-col el-col-2">
      <el-button native-type="button" type="text" title="删除" @click="onRemove">
        <i class="el-icon-close text-danger"></i>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import UFile from '@/pages/_components/FileUploader/UFile'
import FileUploaderInject from '@/pages/_components/FileUploader/FileUploaderInject.vue'

@Component
export default class FileUploaderItem extends FileUploaderInject {
  $refs!: {
    ruleForm: HTMLFormElement
  }
  @Prop({
    required: true,
  })
  item!: UFile

  options = this.FileUploader.options
  rules = {
    name: [
      { required: true, message: '请输入文件名称', trigger: 'blur' },
      { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'change' },
    ],
  }

  validateItem(): Promise<any> {
    // 目前没有只是把结果返回
    return new Promise((resolve): void => {
      this.$refs.ruleForm.validate((valid: boolean): void => {
        this.item.valid = valid
        resolve(valid)
      })
    })
  }
  onRemove(): void {
    this.validateItem()
    if (this.item.isDone()) {
      this.FileUploader.removeFile(this.item)
    }
    this.$confirm('该文件还没有上传完成, 是否继续删除?', '提示', {
      type: 'warning',
    }).then((e) => {
      this.FileUploader.removeFile(this.item)
    })
  }
  mounted() {
    this.FileUploader.$emit('upload.file.addField', this)
  }
  beforeDestroy() {
    this.FileUploader.$emit('upload.file.removeField', this)
  }
}
</script>
