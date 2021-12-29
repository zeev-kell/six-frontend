<template>
  <div class="container-fluid p-20">
    <div class="card">
      <div class="card-header is-align-middle" style="padding-left: 95px">
        <h2 class="mx-0">创建新的应用版本</h2>
        <div class="sub--title">一个应用版本为该应用的一个发布版本，一般包含CWL源码，配套使用教程，运行案例等。</div>
      </div>
      <div class="card-body el-row">
        <div class="el-col-12">
          <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
            <!-- <el-form-item label="应用名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入应用名称，例如：bwa" />
            </el-form-item> -->
            <el-form-item label="应用版本" prop="version">
              <el-input v-model="formModel.version" placeholder="请输入版本，例如：v1.0" />
            </el-form-item>
            <!-- <el-form-item label="分类标签" prop="category">
              <el-input v-model="formModel.category" placeholder="请输入分类标签，例如：序列比对" />
            </el-form-item>
            <el-form-item label="应用类型" prop="type">
              <el-select v-model="formModel.type" placeholder="请选择应用类型" clearable style="width: 100%" :disabled="disabledType">
                <el-option v-for="item in typeList" :key="item.value" :label="$t('constant.' + item.label)" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="应用来源" prop="description">
              <el-input v-model="formModel.website" placeholder="请输入网址，例如：https://www.sixoclock.net" />
            </el-form-item>
            <el-form-item label="功能描述" prop="description">
              <el-input v-model="formModel.description" type="textarea" :rows="4" placeholder="请输入应用功能描述，例如：使用bwa对NGS下机数据进行比对" />
            </el-form-item> -->
          </el-form>
        </div>
      </div>
      
      <div class="card-header el-row--flex is-align-middle">
      <h2 class="mx-0 el-col-equal">
        {{ title }}
      </h2>
    </div>
    <div class="card-body">
      <el-tabs v-model="activeName" type="card" :before-leave="onBeforeLeave">
        <el-tab-pane label="编辑内容" name="1">
          <div class="codemirror-box">
            <code-mirror-client v-model="formModel" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="预览内容" name="2">
          <div v-if="activeName === '2'" class="page-graph-box workflow-box">
            <graph-index :item="graph" :readonly="true" class="h-100" tools="run|plus,minus,fit|auto" />
          </div>
        </el-tab-pane>
        <!--        <el-tab-pane label="可视化编辑" name="3"></el-tab-pane>-->
      </el-tabs>
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
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import CodeMirrorClient from '@/pages/application/_components/codeMirror/CodeMirrorClient.vue'

@Component({
  components: { CodeMirrorClient, LoadingButton, GraphIndex },
})
export default class PipeNewPage extends Vue {
  activeName = '1'
  content = ''

  $refs!: {
    formModel: HTMLFormElement
  }

  formModel: any = {
    name: '',
    version: '',
    description: '',
    category: '',
    website: '',
    tutorial: '',
    type: '',
    content: '',
  }



  get title() {
    if (this.$store.getters['pipe/isSoftware']) {
      // 选择新建类型为”工具”或“工具流”时标题显示为“应用参数结构CWL”
      return '应用参数结构CWL'
    } else if (this.$store.getters['pipe/isOperation']) {
      // “工作”或“工作流”时标题显示为“应用参数配置YML”
      return '应用参数配置YML'
    } else if (this.$store.getters['pipe/isDocker']) {
      // 为“docker”时，标题显示为“应用Dockerfile”
      return '应用Dockerfile'
    } else {
      return ''
    }
  }
  get graph() {
    return {
      content: this.content,
      type: this.item.type,
      resource_id: this.item.resource_id,
    }
  }

  onBeforeLeave(activeName: string) {
    if (activeName === '3') {
      window.open(`/graph-info/${this.item.resource_id}/edit`, '_blank')
      return false
    }
    return true
  }

  mounted() {
    this.content = this.item.content.toString()
  }


  rules = {
    // name: [
    //   { required: true, message: '请输入名称', trigger: 'blur' },
    //   { min: 2, max: 128, message: '长度在 2 到 128 个字符', trigger: 'blur' },
    // ],
    version: [
      { required: true, message: '请输入版本', trigger: 'blur' },
      { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
    ],
    // type: [{ required: true, message: '请选择类型', trigger: 'change' }],
    // category: [
    //   { required: true, message: '请输入分类', trigger: 'blue' },
    //   { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    // ],
  }
  disabledType = false
  typeList = pipeConstants.getItemsList('TYPE_')

  async onSubmit() {
    await this.$refs.formModel.validate()
    await this.$api.pipe.createRepository(this.formModel).then((data) => {
      const id = data?.data?.id
      this.$I18nRouter.push(`/application/pipe/${id}/edit`)
    })
  }
}
</script>

<style lang="scss" scoped>
.workflow-box,
.codemirror-box {
  min-height: 450px;
  height: calc(100vh - 130px);
}
.codemirror-box ::v-deep > .vue-codemirror {
  height: 100%;
  > .CodeMirror {
    height: 100%;
  }
}
</style>