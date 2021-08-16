<template>
  <div class="container-fluid p-20">
    <div class="card">
      <div class="card-header is-align-middle" style="padding-left: 95px">
        <h2 class="mx-0">创建新的应用</h2>
        <div class="sub--title">一个应用一般包含元信息，核心内容和关联资源以及该应用的子版本。</div>
      </div>
      <div class="card-body el-row">
        <div class="el-col-12">
          <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="版本" prop="version">
              <el-input v-model="formModel.version" placeholder="请输入版本" />
            </el-form-item>
            <el-form-item label="分类" prop="category">
              <el-input v-model="formModel.category" placeholder="请输入分类" />
            </el-form-item>
            <el-form-item label="类别" prop="type">
              <el-select v-model="formModel.type" placeholder="请选择类别" clearable style="width: 100%">
                <el-option v-for="item in typeList" :key="item.value" :label="$t(item.label)" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="description">
              <el-input v-model="formModel.website" placeholder="请输入地址" />
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input v-model="formModel.description" type="textarea" :rows="4" placeholder="请输入描述" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="card-footer">
        <loading-button :callback="onSubmit" type="success" icon="el-icon-plus"> 保存 </loading-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { pipeConstants } from '@/constants/PipeConstants'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  components: { LoadingButton },
})
export default class PipeNewPage extends Vue {
  $refs!: {
    formModel: HTMLFormElement
  }
  formModel = {
    name: '',
    version: '',
    description: '',
    category: '',
    website: '',
    tutorial: '',
    type: '',
    content: '',
  }
  rules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 2, max: 128, message: '长度在 2 到 128 个字符', trigger: 'blur' },
    ],
    version: [
      { required: true, message: '请输入版本', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
    ],
    type: [{ required: true, message: '请选择类型', trigger: 'change' }],
    category: [
      { required: true, message: '请输入分类', trigger: 'blue' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    ],
  }
  cmOptions = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    mode: 'text/yaml',
    lineWrapping: true,
    theme: 'default',
  }
  loading = false
  typeList = pipeConstants.items
  async onSubmit() {
    await this.$refs.formModel.validate()
    await this.$$axios.$post('/v2/pipe', this.formModel).then((data) => {
      const id = data?.data?.id
      this.$I18nRouter.push(`/application/pipe/${id}/edit`)
    })
  }
}
</script>
