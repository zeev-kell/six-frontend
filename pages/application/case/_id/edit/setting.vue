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
            <el-select v-model="formModel.category" multiple filterable allow-create placeholder="请输入分类" style="width: 100%">
              <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.name"> </el-option>
            </el-select>
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

@Component({
  components: { LoadingButton },
})
export default class CaseSetting extends CaseItemMixin {
  $refs!: {
    formModel: HTMLFormElement
  }
  formModel: any = {
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
  categoryList: any[] = []

  mounted(): void {
    this.formModel.name = this.item.name
    this.formModel.category = this.item.category.map((c: any) => (typeof c === 'string' ? c : c.name))
    this.formModel.description = this.item.description
    this.formModel.version = this.content.version
    this.categoryList = this.item.category
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
      this.$store.commit('case/UPDATE_CURRENT_STORE', data)
    })
  }
}
</script>
