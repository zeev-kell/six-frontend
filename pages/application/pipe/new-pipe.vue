<template>
  <div class="container-fluid">
    <div class="panel">
      <div class="panel-body el-row">
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
                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
    </div>
    <div class="panel">
      <div class="panel-header">
        <h2 class="mx-0">示例教程</h2>
      </div>
      <div class="panel-body marked-content">
        <client-only placeholder="Codemirror Loading...">
          <markdown v-model="formModel.tutorial" />
        </client-only>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <h2 class="mx-0">软件结构与参数配置</h2>
      </div>
      <div class="panel-body">
        <client-only placeholder="Codemirror Loading...">
          <codemirror v-model="formModel.cwl" :options="cmOptions" />
        </client-only>
      </div>
    </div>
    <div class="el-row text-right mt-20">
      <el-button type="success" icon="el-icon-plus" :loading="loading" @click="onSubmit"> 保存 </el-button>
    </div>
  </div>
</template>

<script type="text/babel">
import pipeConstants from '@/constants/PipeConstants'
export default {
  components: {
    codemirror: () => import('@/pages/application/_components/CodeMirror'),
    Markdown: () => import('@/pages/application/_components/markdown/simple'),
  },
  data() {
    return {
      formModel: {
        name: '',
        version: '',
        description: '',
        category: '',
        website: '',
        tutorial: '',
        type: '',
        cwl: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
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
      },
      cmOptions: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/yaml',
        lineWrapping: true,
        theme: 'default',
      },
      loading: false,
      typeList: pipeConstants.items,
    }
  },
  methods: {
    onSubmit() {
      this.$refs.formModel.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$$axios
            .post('/pipe', this.formModel)
            .then(() => {
              this.$router.push('/application/pipes')
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          this.$message.warning('请填写完整信息')
          return false
        }
      })
    },
  },
}
</script>
