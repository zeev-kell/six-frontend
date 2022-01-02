<template>
  <div class="container-fluid p-20">
    <div class="card">
      <div class="card-header is-align-middle" style="padding-left: 95px">
        <h2 class="mx-0">创建新的应用</h2>
        <div class="sub--title">
          一个应用一般包含元信息，核心内容和关联资源以及该应用的子版本。稍后您可在应用详情界面为该应用创建一个版本并填入CWL源码。
        </div>
      </div>
      <div class="card-body el-row">
        <div class="el-col-12">
          <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
            <el-form-item label="应用名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入应用名称，例如：bwa" />
            </el-form-item>
            <el-form-item label="应用版本" prop="version">
              <el-input v-model="formModel.version" placeholder="请输入版本，例如：v1.0" />
            </el-form-item>
            <el-form-item label="分类标签" prop="category">
              <category-select v-model="formModel.category" multiple type="pipe" placeholder="请输入分类" class="w-100" />
            </el-form-item>
            <el-form-item label="应用类型" prop="type">
              <pipe-type-select v-model="formModel.type" placeholder="请选择应用类型" />
            </el-form-item>
            <el-form-item label="应用来源" prop="description">
              <el-input v-model="formModel.website" placeholder="请输入网址，例如：https://www.sixoclock.net" />
            </el-form-item>
            <el-form-item label="功能描述" prop="description">
              <el-input
                v-model="formModel.description"
                type="textarea"
                :rows="4"
                placeholder="请输入应用功能描述，例如：使用bwa对NGS下机数据进行比对"
              />
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
import PipeTypeSelect from '@/pages/application/_components/PipeTypeSelect.vue'
import CategorySelect from '@/pages/application/_components/CategorySelect.vue'
import { PipeRepositoryModel } from '@/types/model/Pipe'

@Component({
  components: { CategorySelect, PipeTypeSelect, LoadingButton },
})
export default class PipeRepositoryNewPage extends Vue {
  $refs!: {
    formModel: HTMLFormElement
  }

  formModel: any = {
    name: '',
    type: '',
    description: '',
    category: [],
    website: '',
    version: '',
    content: '',
    profile: '',
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
    category: [{ required: true, message: '请选择分类', trigger: 'blue' }],
  }
  async onSubmit(): Promise<void> {
    await this.$refs.formModel.validate()
    await this.$api.pipe.create(this.formModel).then((data) => {
      const id = data?.data?.id
      this.$I18nRouter.push(`/application/pipe/${id}/edit`)
    })
  }
}
</script>
