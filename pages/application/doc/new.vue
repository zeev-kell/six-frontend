<template>
  <div class="container-fluid p-20">
    <div class="card">
      <div class="card-body el-row">
        <div class="el-col-12">
          <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
            <el-form-item label="标题" prop="title">
              <el-input v-model="formModel.title" placeholder="请输入标题（2到50个汉字）" />
            </el-form-item>
            <el-form-item label="类别" prop="type">
              <el-select v-model="formModel.type" placeholder="请选择类别" clearable style="width: 100%">
                <el-option v-for="item in typeList" :key="item.value" :label="$t('constant.' + item.label)" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="图片" prop="image">
              <el-input v-model="formModel.image" placeholder="标题地址" />
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
    </div>
    <div class="card">
      <div class="card-header">
        <h2 class="mx-0">拟写正文</h2>
      </div>
      <div class="card-body">
        <mavon-editor-client v-model="formModel.content"></mavon-editor-client>
      </div>
    </div>
    <div class="el-row text-right mt-20">
      <loading-button type="success" icon="el-icon-plus" :callback="onSubmit"> 保存 </loading-button>
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
}
</script>
