<template>
  <div class="container-fluid p-20">
    <div class="card">
      <div class="card-header is-align-middle" style="padding-left: 95px">
        <h2 class="mx-0">创建新的案例</h2>
      </div>
      <div class="card-body el-row">
        <div class="el-col-12">
          <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
            <el-form-item label="名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="分类" prop="category">
              <el-input v-model="formModel.category" placeholder="请输入分类" />
            </el-form-item>
            <el-form-item label="类别" prop="type">
              <el-select v-model="formModel.type" placeholder="请选择类别" clearable style="width: 100%" :disabled="disabledType">
                <el-option v-for="item in typeList" :key="item.value" :label="$t('constant.' + item.label)" :value="item.value" />
              </el-select>
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
import LoadingButton from '@/components/LoadingButton.vue'
import { caseConstants } from '@/constants/CaseConstants'

@Component({
  components: { LoadingButton },
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
    category: [
      { required: true, message: '请输入分类', trigger: 'blue' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    ],
  }
  disabledType = true
  typeList = caseConstants.getItemsList('TYPE_')

  async onSubmit() {
    await this.$refs.formModel.validate()
    await this.$api.case.create(this.formModel).then((data) => {
      const id = data?.data?.id
      this.$I18nRouter.push(`/application/case/${id}/edit`)
    })
  }
}
</script>
