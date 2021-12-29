<template>
  <div class="container-fluid card">
    <div class="card-body el-row">
      <div class="el-col-12">
        <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
          <el-form-item label="应用名称" prop="name">
            <el-input v-model="formModel.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="默认版本" prop="version">
            <el-select v-model="formModel.resource_id" class="w-100" placeholder="请输入版本">
              <el-option v-for="version in versions" :key="version.value" :label="version.label" :value="version.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="分类标签" prop="category">
            <category-select-multiple v-model="formModel.category" type="pipe" placeholder="请输入分类" />
          </el-form-item>
          <el-form-item label="应用来源" prop="description">
            <el-input v-model="formModel.website" placeholder="请输入地址" />
          </el-form-item>
          <el-form-item label="功能描述" prop="description">
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
import PipeItemMixin from '@/pages/application/pipe/repository/_components/PipeItemMixin.vue'
import CategorySelectMultiple from '@/pages/application/_components/CategorySelectMultiple.vue'
import { CategoryModel } from '@/types/model/Common'

@Component({
  components: { CategorySelectMultiple, LoadingButton },
})
export default class Setting extends PipeItemMixin {
  $refs!: {
    formModel: HTMLFormElement
  }
  formModel: any = {
    name: '',
    resource_id: '',
    category: [],
    website: '',
    description: '',
  }
  rules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 2, max: 128, message: '长度在 2 到 128 个字符', trigger: 'blur' },
    ],
    // version: [{ required: true, message: '请选择默认版本', trigger: 'blur' }],
    category: [{ required: true, message: '请选择分类', trigger: 'blue' }],
  }

  get versions(): any[] {
    return this.item.versions.map((version: any) => {
      return {
        value: version.resource_id,
        label: version.version,
      }
    })
  }
  mounted(): void {
    ;['name', 'resource_id', 'website', 'description'].forEach((key: string) => {
      this.formModel[key] = (this.item as any)[key]
    })
    this.formModel.category = (this.item.category as unknown as CategoryModel[]).map((c: CategoryModel) => c.name)
  }
  async onSubmit(): Promise<void> {
    await this.$refs.formModel.validate()
    await this.$api.pipe.updateRepository(this.item.pipe_id, this.formModel).then(() => {
      this.$store.commit('pipeRepository/UPDATE_CURRENT_STORE', this.formModel)
    })
  }
}
</script>
