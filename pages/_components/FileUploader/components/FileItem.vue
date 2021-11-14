<template>
  <transition name="fade">
    <el-form v-if="item.canEdit" ref="ruleForm" :inline="true" :rules="rules" :model="item" class="el-row row" :show-message="false">
      <el-form-item class="el-col el-col-3" prop="name">
        <el-input v-model="item.name" placeholder="文件名称"></el-input>
      </el-form-item>
      <el-form-item class="el-col el-col-3">
        <el-input v-model="item.mediaType" placeholder="媒介类型"></el-input>
      </el-form-item>
      <el-form-item class="el-col el-col-3">
        <el-input v-model="item.label" placeholder="标签"></el-input>
      </el-form-item>
      <el-form-item class="el-col el-col-2">
        {{ item.bytes | formatbytes }}
      </el-form-item>
      <el-form-item class="el-col el-col-5">
        <transition name="fade">
          <div v-if="item.loading">
            <span class="el-icon-loading"></span>
            计算中...
          </div>
          <div v-else v-truncate="item.hash"></div>
        </transition>
      </el-form-item>
      <el-form-item class="el-col el-col-3">
        <el-select v-model="item.encoding" placeholder="格式规范">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="el-col el-col-3">
        <el-input v-model="item.description" placeholder="说明"></el-input>
      </el-form-item>
      <el-form-item class="el-col el-col-2">
        <el-tooltip v-if="item.errorMsg" effect="light" :content="item.errorMsg" placement="top">
          <span class="el-icon-error text-danger"></span>
        </el-tooltip>
        <el-button native-type="button" type="text" circle title="删除" @click="onRemove">
          <i class="el-icon-close text-danger"></i>
        </el-button>
      </el-form-item>
    </el-form>
    <div v-else class="row el-row">
      <div class="file-progress" :style="progressStyle"></div>
      <div class="file-info">
        <div class="el-form-item el-col el-col-3">
          <div v-truncate="item.name"></div>
        </div>
        <div class="el-form-item el-col el-col-3">
          <div v-truncate="item.mediaType"></div>
        </div>
        <div class="el-form-item el-col el-col-3">
          <div v-truncate="item.label"></div>
        </div>
        <div class="el-form-item el-col el-col-2">
          {{ item.bytes | formatbytes }}
        </div>
        <div class="el-form-item el-col el-col-5">
          <div v-truncate="item.label"></div>
        </div>
        <div class="el-form-item el-col el-col-3">
          {{ item.encoding }}
        </div>
        <div class="el-form-item el-col el-col-3"><div v-truncate="item.description"></div></div>
        <div class="el-form-item el-col el-col-2">
          <el-tooltip v-if="item.errorMsg" effect="light" :content="item.errorMsg" placement="top">
            <span class="el-icon-error text-danger"></span>
          </el-tooltip>
          <span v-if="item.isSuccess()" class="el-icon-success text-success"> </span>
          <span>{{ item.status | fileTypeTranslate | t }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import UFile from '@/pages/_components/FileUploader/components/UFile'
import FileUploaderInject from '@/pages/_components/FileUploader/FileUploaderInject.vue'
import formatbytes from '@/filters/formatbytes'
import { fileConstants } from '@/constants/FileConstants'

@Component({
  filters: {
    ...formatbytes,
    fileTypeTranslate: fileConstants.get,
  },
})
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
      { validator: this.validator, trigger: 'blur' },
    ],
  }

  get progressStyle(): any {
    const progress = Math.floor(this.item.progress * 100)
    const style = `translateX(${Math.floor(progress - 100)}%)`
    return {
      progress: `${progress}%`,
      webkitTransform: style,
      mozTransform: style,
      msTransform: style,
      transform: style,
    }
  }
  get items(): any[] {
    return this.$store.getters['datum/items']
  }

  validator(rule: any, value: string, callback: any): any {
    if (value !== '') {
      const files = this.FileUploader.files.concat(this.items).filter((f) => f.name === value)
      if (files.length > 1) {
        this.$message.error('文件名称有重复')
        callback(new Error('文件名称有重复'))
        return
      }
      return callback()
    }
    callback()
  }
  validateItem(): Promise<any> {
    // 目前没有只是把结果返回
    return new Promise((resolve): void => {
      if (!this.item.canEdit) {
        resolve(true)
        return
      }
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
      return
    }
    this.$confirm('该文件还没有上传完成, 是否继续删除?', '提示', {
      type: 'warning',
    }).then(() => {
      this.FileUploader.removeFile(this.item)
    })
  }
  mounted(): void {
    this.FileUploader.$emit('upload.file.addField', this)
  }
  beforeDestroy(): void {
    this.FileUploader.$emit('upload.file.removeField', this)
  }
}
</script>
<style scoped lang="scss">
.file-progress {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #e2eeff;
  transform: translateX(-100%);
}
.file-info {
  position: relative;
  z-index: 1;
  height: 100%;
  overflow: hidden;
  &:hover {
    background-color: hsla(0, 0%, 94%, 0.2);
  }
  ::v-deep .el-form-item > .text-truncate {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
