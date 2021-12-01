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
        <markdown-client v-model="formModel.content" />
      </div>
    </div>
    <div class="el-row text-right mt-20">
      <el-button type="success" icon="el-icon-plus" :loading="loading" @click="onSubmit"> 保存 </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MarkdownClient from '@/pages/application/_components/MarkdownClient.vue'

@Component({
  components: {
    MarkdownClient,
  },
  async asyncData({ app, params }) {
    const item: any = await app.$axios.$get(`/v1/blog/${params.id}`)
    if (typeof item.cwl !== 'string') {
      // 尝试转换字段为字符串
      item.cwl = JSON.stringify(item.cwl, null, 2)
    }
    item.content = item.content?.replace(/[↵ ]{2,}/g, '  \n')
    const category: any[] = []
    for (const tag in item.tag) {
      category.push((tag as any).name)
    }
    item.category = category.join(',')
    return { formModel: item }
  },
})
export default class DocEdit extends Vue {
  $refs!: {
    formModel: HTMLFormElement
  }

  formModel: any = {
    title: '',
    category: '',
    content: '',
  }
  rules: any = {
    title: [
      { required: true, message: '请输入标题', trigger: 'blur' },
      { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
    ],
    category: [
      { required: true, message: '请输入分类', trigger: 'blue' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    ],
  }

  loading = false

  onSubmit(): void {
    this.$refs.formModel.validate((valid: boolean) => {
      if (valid) {
        this.loading = true
        this.$$axios
          .put('/v1/blog/' + this.formModel.id, this.formModel)
          .then(() => {
            this.$I18nRouter.push('/application/doc/' + this.formModel.id)
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.$message.warning('请填写完整信息')
        return false
      }
    })
  }
}
</script>
