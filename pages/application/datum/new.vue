<template>
  <div class="container-fluid p-20">
    <div class="card">
      <div class="card-header is-align-middle" style="padding-left: 95px">
        <h2 class="mx-0">创建新的数据</h2>
        <div class="sub--title">一个数据一般包含元信息，核心内容和关联资源以及该数据的子版本。</div>
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
              <category-select v-model="formModel.category" multiple type="data" placeholder="请输入分类" class="w-100" />
            </el-form-item>
            <el-form-item label="类别" prop="type">
              <datum-type-select v-model="formModel.type" placeholder="请选择类别" class="w-100" />
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
import { datumConstants } from '@/constants/DatumConstants'
import LoadingButton from '@/components/LoadingButton.vue'
import CategorySelect from '@/pages/application/_components/CategorySelect.vue'
import DatumTypeSelect from '@/pages/application/_components/DatumTypeSelect.vue'

@Component({
  components: { DatumTypeSelect, CategorySelect, LoadingButton },
})
export default class DatumNewPage extends Vue {
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
    category: [{ required: true, message: '请输入分类', trigger: 'blue' }],
  }

  async onSubmit() {
    await this.$refs.formModel.validate()
    await this.$api.datum.create(this.formModel).then((data) => {
      const id = data?.data?.id
      this.$I18nRouter.push(`/application/datum/${id}/edit`)
    })
  }
}
</script>
