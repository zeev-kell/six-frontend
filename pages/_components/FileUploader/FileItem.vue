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
          <div v-else class="text-truncate" :title="item.hash">{{ item.hash }}</div>
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
          <div class="text-truncate" :title="item.name">{{ item.name }}</div>
        </div>
        <div class="el-form-item el-col el-col-3">
          {{ item.mediaType }}
        </div>
        <div class="el-form-item el-col el-col-3">
          {{ item.label }}
        </div>
        <div class="el-form-item el-col el-col-2">
          {{ item.bytes | formatbytes }}
        </div>
        <div class="el-form-item el-col el-col-5">
          <div class="text-truncate" :title="item.hash">{{ item.hash }}</div>
        </div>
        <div class="el-form-item el-col el-col-3">
          {{ item.encoding }}
        </div>
        <div class="el-form-item el-col el-col-3">
          {{ item.description }}
        </div>
        <div class="el-form-item el-col el-col-2">
          <el-tooltip v-if="item.errorMsg" effect="light" :content="item.errorMsg" placement="top">
            <span class="el-icon-error text-danger"></span>
          </el-tooltip>
          <span v-if="item.isSuccess()" class="el-icon-success text-success"> </span>
          <span>{{ item.status }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import UFile from '@/pages/_components/FileUploader/UFile'
import FileUploaderInject from '@/pages/_components/FileUploader/FileUploaderInject.vue'
import formatbytes from '@/filters/formatbytes'

@Component({
  filters: {
    ...formatbytes,
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
}
</style>
