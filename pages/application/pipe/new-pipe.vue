<template>
  <div class="container-fluid">
    <div class="panel">
      <div class="panel-body el-row">
        <div class="el-col-12">
          <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formModel.name"></el-input>
            </el-form-item>
            <el-form-item label="版本" prop="version">
              <el-input v-model="formModel.version"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input v-model="formModel.description"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <h2 class="mx-0">示例教程</h2>
      </div>
      <div class="panel-body">
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
      <el-button type="primary" icon="el-icon-circle-plus" size="success" :loading="loading" @click="onSubmit">
        保存
      </el-button>
    </div>
  </div>
</template>

<script type="text/babel">
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
          tutorial: '',
          cwl: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
          ],
          version: [
            { required: true, message: '请输入版本', trigger: 'blur' },
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
