<template>
  <div class="container-fluid p-20">
    <div class="card">
      <div class="card-header is-align-middle" style="padding-left: 95px">
        <h2 class="mx-0">创建新的案例</h2>
        <div class="sub--title">一个案例为一个无需额外配置即可直接运行的程序运行范例（如cwlc，jupyter notebook）</div>
      </div>
      <div class="card-body el-row">
        <div class="el-col-12">
          <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="分类" prop="category">
              <category-select v-model="formModel.category" multiple type="case" allow-create placeholder="请输入分类" class="w-100" />
            </el-form-item>
            <el-form-item label="类别" prop="type">
              <case-type-select v-model="formModel.type" placeholder="请选择类别" :disabled="true" class="w-100" />
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input v-model="formModel.description" type="textarea" :rows="4" placeholder="请输入描述" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="card-footer">
        <nuxt-link :to="localePath('application-cases')">
          <el-button icon="el-icon-back"> 取消 </el-button>
        </nuxt-link>
        <loading-button :callback="onSubmit" type="success" icon="el-icon-plus"> 保存 </loading-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'
import { caseConstants } from '@/constants/CaseConstants'
import CaseTypeSelect from '@/pages/application/_components/CaseTypeSelect.vue'
import CategorySelect from '@/pages/application/_components/CategorySelect.vue'
import { CASE_LOCAL } from '@/constants/PipeConstants'
import { getStore } from '@/utils/local-storage'

@Component({
  components: { CategorySelect, CaseTypeSelect, LoadingButton },
})
export default class CaseNewPage extends Vue {
  $refs!: {
    formModel: HTMLFormElement
  }

  formModel: any = {
    name: '',
    description: '',
    category: '',
    type: 0,
    instruction: '',
    readme: '',
    content: '',
  }
  rules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 2, max: 128, message: '长度在 2 到 128 个字符', trigger: 'blur' },
    ],
    category: [{ required: true, message: '请输入分类', trigger: 'blue' }],
  }

  async onSubmit() {
    await this.$refs.formModel.validate()
    await this.$api.case.create(this.formModel).then((data) => {
      const id = data?.data?.id
      this.$I18nRouter.push(`/application/case/${id}/edit`)
    })
  }
  mounted(): void {
    if (this.$route.query.local) {
      this.formModel.content = getStore(CASE_LOCAL)
    }
  }
}
</script>
