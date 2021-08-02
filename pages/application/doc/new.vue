<template>
  <div class="container-fluid p-20">
    <div class="card">
      <div class="card-body el-row">
        <div class="el-col-12">
          <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
            <el-form-item label="标题" prop="name">
              <el-input v-model="formModel.title" placeholder="请输入标题（2到50个汉字）" />
            </el-form-item>
            <el-form-item label="分类" prop="category">
              <el-input v-model="formModel.category" placeholder="请输入分类" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h2 class="mx-0">拟写正文</h2>
      </div>
      <div class="card-body marked-content">
        <client-only placeholder="Loading...">
          <markdown v-model="formModel.content" />
        </client-only>
      </div>
    </div>
    <!-- <div class="card">
      <div class="card-header">
        <h2 class="mx-0">软件结构与参数配置</h2>
      </div>
      <div class="card-body">
        <client-only placeholder="Loading...">
          <codemirror v-model="formModel.cwl" :options="cmOptions" />
        </client-only>
      </div>
    </div> -->
    <div class="el-row text-right mt-20">
      <el-button type="success" icon="el-icon-plus" :loading="loading" @click="onSubmit"> 保存 </el-button>
    </div>
  </div>
</template>

<script type="text/babel">
import pipeConstants from '@/constants/PipeConstants'
export default {
  components: {
    // codemirror: () => import('@/pages/application/_components/CodeMirror'),
    Markdown: () => import('@/pages/application/_components/markdown/simple'),
  },
  data() {
    return {
      formModel: {
        title: '',
        category: '',
        content: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
        ],
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
            .post('/v1/blog', this.formModel)
            .then(() => {
              this.$I18nRouter.push('/application/docs')
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
