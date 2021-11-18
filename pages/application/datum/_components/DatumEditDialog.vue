<template>
  <el-dialog title="修改文件" :visible.sync="dialogVisible" width="50%">
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
      <el-form-item label="MD5校验码" prop="hash">
        {{ ruleForm.hash }}
      </el-form-item>
      <el-form-item label="格式规范" prop="schema">
        <el-select v-model="ruleForm.schema" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
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
import { Component, Vue } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'
@Component({
  components: { LoadingButton },
})
export default class DatumEditDialog extends Vue {
  dialogVisible = false
  item: any = {}
  ruleForm: any = {
    name: '',
    mediatype: '',
    bytes: 0,
    hash: '',
    schema: '',
    description: '',
  }
  rules = {
    name: [
      { required: true, message: '请输入文件名称', trigger: 'blur' },
      { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'change' },
      { validator: this.validator, trigger: 'blur' },
    ],
  }

  get items(): any[] {
    return this.$store.getters['datum/items']
  }

  onShowDialog(item: any): void {
    this.item = item
    this.dialogVisible = true
    this.resetForm()
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
      this.ruleForm[k] = this.item[k]
    })
  }
  onSubmit() {}
}
</script>
