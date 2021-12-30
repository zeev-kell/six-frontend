<template>
  <div class="container-fluid card">
    <div class="card-body el-row">
      <div class="el-col-12">
        <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
          <el-form-item label="应用名称" prop="name">
            <el-input v-model="formModel.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="默认版本" prop="version">
            <el-select v-model="formModel.resource_id" class="w-100" placeholder="请选择版本">
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
    <div class="card-header el-row--flex">
      <h3 class="card-title mt-10 el-col-full">删除仓库</h3>
    </div>
    <div class="card-body">
      <div class="text-muted mb-10">删除应用仓库将销毁存储在其中的所有应用版本！此操作不可逆。</div>

      <can-create :is-user="item.provider">
        <loading-button type="danger" icon="el-icon-delete" class="mx-0" :callback="handleDelete"> 删除仓库 </loading-button>
      </can-create>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import LoadingButton from '@/components/LoadingButton.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'
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
      this.$store.commit('pipe/UPDATE_CURRENT_STORE', this.formModel)
    })
  }

  handleDelete(): Promise<any> {
    return this.$confirm('此操作将永久删除该应用仓库并同时删除所有应用版本, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      return this.$api.pipe.deleteRepository(this.item.pipe_id).then(() => {
        this.$I18nRouter.push('/application/pipes')
      })
    })
  }
}
</script>
