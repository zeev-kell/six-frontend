<template>
  <div class="container-fluid p-20">
    <div class="card" style="padding-bottom: 20px">
      <div class="card-header">
        <el-input v-model="formModel.title" placeholder="请输入标题（最多100个字）" class="title"></el-input>
      </div>
      <div class="card-body">
        <mavon-editor-client v-model="formModel.content" placeholder="请输入正文" @fullScreen="onFullScreen"></mavon-editor-client>
      </div>
      <div class="card-body">
        <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
          <el-form-item label="添加封面" prop="image">
            <el-input v-model="formModel.image" placeholder="标题地址" />
          </el-form-item>
          <el-form-item label="类别" prop="type">
            <el-select v-model="formModel.type" placeholder="请选择类别" clearable style="width: 100%">
              <el-option v-for="item in typeList" :key="item.value" :label="$t('constant.' + item.label)" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-select v-model="formModel.category" multiple filterable allow-create placeholder="请输入分类" style="width: 100%">
              <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="formModel.description" type="textarea" :rows="4" placeholder="请输入描述" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="!fullScreen" class="actions el-row">
      <div class="el-col-equal"></div>
      <div class="el-col-equal text-right">
        <span class="mr-10 text-muted">字数：{{ formModel.content.length }} 字</span>
        <nuxt-link v-slot="{ href }" :to="localePath('doc-preview')" custom>
          <a class="el-button el-button--info el-button--medium" target="_blank" :href="href">预览</a>
        </nuxt-link>
        <loading-button type="success" icon="el-icon-plus" :callback="onSubmit"> 保存 </loading-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { blogConstants } from '@/constants/BlogConstants'
import LoadingButton from '@/components/LoadingButton.vue'
import MavonEditorClient from '@/pages/application/_components/mavonEditor/MavonEditorClient.vue'

@Component({
  components: {
    MavonEditorClient,
    LoadingButton,
  },
})
export default class DocNewPage extends Vue {
  $refs!: {
    formModel: HTMLFormElement
  }

  formModel = {
    title: '',
    type: undefined,
    category: [],
    content: '',
    image: '',
    description: '',
  }
  rules = {
    title: [
      { required: true, message: '请输入标题', trigger: 'blur' },
      { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
    ],
    type: [{ required: true, message: '请输入类别', trigger: 'blue' }],
    category: [{ required: true, message: '请输入分类', trigger: 'blue' }],
  }
  typeList = blogConstants.getItemsList('TYPE_')
  categoryList = [
    {
      value: 'CWL',
      label: 'CWL',
    },
  ]
  fullScreen = false

  async onSubmit() {
    await this.$refs.formModel.validate().catch((e: Error) => {
      this.$message.warning('请填写完整信息')
      throw e
    })
    const data = Object.assign({}, this.formModel, { category: this.formModel.category.join(',') })
    await this.$api.blog.create(data).then(() => {
      this.$I18nRouter.push('/application/docs')
    })
  }
  onFullScreen(fullScreen: boolean) {
    this.fullScreen = fullScreen
  }
}
</script>

<style scoped lang="scss">
.title ::v-deep > input {
  border: none !important;
  font-size: 2em;
  font-weight: bold;
}
.actions {
  text-align: right;
  padding: 10px 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1501;
  margin: 0;
  min-width: 0;
  display: flex;
  left: 0;
  right: 0;
  border-top: 1px solid #ebebeb;
  background: #ffffff;
  -webkit-font-smoothing: subpixel-antialiased;
}
</style>
