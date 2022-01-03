<template>
  <div class="container-fluid card">
    <div class="card-body el-row">
      <div class="el-col-12">
        <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formModel.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="版本" prop="description">
            <el-input v-model="formModel.version" placeholder="输入版本"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <category-select v-model="formModel.category" type="case" multiple allow-create placeholder="请输入分类" class="w-100" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="formModel.description" type="textarea" :rows="4" placeholder="请输入描述" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card-footer">
      <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'
import CategorySelect from '@/pages/application/_components/CategorySelect.vue'

@Component({
  components: { CategorySelect, LoadingButton },
})
export default class CaseSetting extends CaseItemMixin {
  $refs!: {
    formModel: HTMLFormElement
  }

  formModel = {
    name: '',
    category: [],
    description: '',
    version: '',
  }
  rules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 2, max: 128, message: '长度在 2 到 128 个字符', trigger: 'blur' },
    ],
    category: [{ required: true, message: '请输入分类', trigger: 'blue' }],
  }

  mounted(): void {
    ;['name', 'category', 'description'].forEach((key: string) => {
      ;(this.formModel as any)[key] = (this.item as any)[key]
    })
    this.formModel.version = this.content.version
  }
  async onSubmit() {
    await this.$refs.formModel.validate().catch((e: Error) => {
      this.$message.warning('请填写完整信息')
      throw e
    })
    const content = this.$store.getters['case/content']
    content.version = this.formModel.version
    const data = {
      content,
      name: this.formModel.name,
      category: this.formModel.category,
      description: this.formModel.description,
    }
    await this.$api.case.update(this.item.resource_id, data).then(() => {
      data.content = JSON.stringify(data.content)
      this.$store.commit('case/UPDATE_CURRENT_STORE', data)
    })
  }
}
</script>
