<template>
  <el-dialog title="修改文件" :visible.sync="dialogVisible" width="50%">
    {{ uFile }}
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="媒介类型" prop="mediatype">
        <el-input v-model="ruleForm.mediatype"></el-input>
      </el-form-item>
      <el-form-item label="大小" prop="bytes">
        <el-input v-model="ruleForm.bytes"></el-input>
      </el-form-item>
      <el-form-item v-if="isOss" label="MD5校验码" prop="hash">
        <div class="el-row el-row--flex">
          <div class="el-col el-col-auto" style="padding-right: 10px">
            <file-btn>选择文件</file-btn>
          </div>
          <div class="el-col el-col-equal">
            <transition name="fade">
              <div v-if="uFile.loading">
                <span class="el-icon-loading"></span>
                计算中...
              </div>
              <div v-else v-clipboard="ruleForm.hash">{{ ruleForm.hash }}</div>
            </transition>
          </div>
        </div>
      </el-form-item>
      <el-form-item v-else label="链接" prop="path">
        <el-input v-model="ruleForm.path"></el-input>
      </el-form-item>
      <el-form-item label="格式规范" prop="schema">
        <el-select v-model="ruleForm.schema" placeholder="格式规范">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="说明" prop="description">
        <el-input v-model="ruleForm.description" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="warning" @click="resetForm">重 置</el-button>
      <loading-button type="primary" :callback="onSubmit">确 定</loading-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Watch } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'
import clipboard from '@/directives/clipboard'
import { DatumItemModel, DatumModel } from '@/types/model/Datum'
import FileBtn from '@/pages/_components/FileUploader/components/FileBtn.vue'
import FileUploaderMixin from '@/pages/_components/FileUploader/FileUploaderMixin.vue'
import UFile from '@/pages/_components/FileUploader/components/UFile'
@Component({
  components: { FileBtn, LoadingButton },
  directives: {
    ...clipboard,
  },
})
export default class DatumEditDialog extends FileUploaderMixin {
  $refs!: {
    ruleForm: HTMLFormElement
  }
  dialogVisible = false
  item: any = {}
  ruleForm = {
    name: '',
    mediatype: '',
    bytes: 0,
    hash: '',
    schema: '',
    description: '',
    path: '',
  } as DatumItemModel
  rules = {
    name: [
      { required: true, message: '请输入文件名称', trigger: 'blur' },
      { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'change' },
      { validator: this.validator, trigger: 'change' },
    ],
  }
  options: any[] = []
  get uFile(): UFile {
    return this.files[0] || {}
  }

  get items(): any[] {
    return this.$store.getters['datum/items']
  }
  get isOss(): boolean {
    return this.item.saveMode === 'ossObject'
  }

  async onShowDialog(item: any): Promise<void> {
    this.item = item
    this.dialogVisible = true
    this.resetForm()
    if (this.options.length === 0) {
      const options = await this.$api.datum.getFormatList()
      this.options = options.map((o: DatumModel) => ({
        value: o.resource_id,
        label: o.name,
      }))
    }
  }
  validator(rule: any, value: string, callback: any): any {
    if (value !== '') {
      const files = this.items.filter((f) => f.name === value)
      if (files.length > 1) {
        this.$message.error('文件名称有重复')
        callback(new Error('文件名称有重复'))
        return
      }
      return callback()
    }
    callback()
  }
  resetForm() {
    Object.keys(this.ruleForm).forEach((k) => {
      this.ruleForm[k] = this.item[k] || ''
    })
  }
  async onSubmit(): Promise<void> {
    await this.$refs.ruleForm.validate()
    const data = {
      id: this.item.id,
      oss_tag: this.isOss ? 1 : 0,
      content: this.ruleForm,
    }
    await this.$api.datum
      .updateFile(this.$route.params.id, data)
      .then(() => {
        this.dialogVisible = false
        this.$store.commit('system/SET_TABLE_TIME')
      })
      .catch(() => {
        this.$message.error('操作失败')
      })
  }
}
</script>
