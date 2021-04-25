<template>
  <div class="container-fluid">
    <div class="panel">
      <div class="panel-body el-row">
        <div class="el-col-12">
          <el-form label-position="left" label-width="80px" :model="formModel">
            <el-form-item label="名称">
              <el-input v-model="formModel.name"></el-input>
            </el-form-item>
            <el-form-item label="版本">
              <el-input v-model="formModel.region"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="formModel.type"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <h2 class="mx-0">示例教程</h2>
      </div>
      <div class="panel-body"></div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <h2 class="mx-0">软件结构与参数配置</h2>
      </div>
      <div class="panel-body">
        <client-only placeholder="Codemirror Loading...">
          <codemirror v-model="code" :options="cmOptions" />
        </client-only>
      </div>
    </div>
    <div class="el-row text-right mt-20">
      <el-button type="primary" icon="el-icon-circle-plus" size="success">保存</el-button>
    </div>
  </div>
</template>

<script type="text/babel">
  import marked from '@/directives/marked'

  export default {
    directives: {
      ...marked,
    },
    components: {
      codemirror: () => import('@/pages/application/_components/CodeMirror'),
    },
    data() {
      return {
        formModel: {
          name: '',
          version: '',
          description: '',
        },
        code: '',
        cmOptions: {
          tabSize: 4,
          mode: 'text/javascript',
          theme: 'base16-dark',
          lineNumbers: true,
          line: true,
        },
      }
    },
    methods: {
      handleDownload(type = 'cwl') {
        this.$refs.cwl.exportCwl(type)
      },
    },
  }
</script>
