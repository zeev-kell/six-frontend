<template>
  <div class="container-fluid card">
    <div class="card-body el-row">
      <div class="el-col-12">
        <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formModel.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="版本" prop="version">
            <el-select v-model="formModel.version" placeholder="请输入版本" disabled class="w-100">
              <el-option v-for="version in versions" :key="version.value" :label="version.label" :value="version.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <category-select v-model="formModel.category" multiple type="data" placeholder="请输入分类" class="w-100" />
          </el-form-item>
          <el-form-item label="地址" prop="description">
            <el-input v-model="formModel.website" placeholder="请输入地址" />
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
import DatumItemMixin from '@/pages/application/datum/_components/DatumItemMixin.vue'
import CategorySelect from '@/pages/application/_components/CategorySelect.vue'

@Component({
  components: { CategorySelect, LoadingButton },
})
export default class DatumSetting extends DatumItemMixin {
  $refs!: {
    formModel: HTMLFormElement
  }
  formModel = {
    name: '',
    version: '',
    category: [],
    website: '',
    description: '',
  }
  rules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 2, max: 128, message: '长度在 2 到 128 个字符', trigger: 'blur' },
    ],
    category: [{ required: true, message: '请输入分类', trigger: 'blue' }],
  }

  get versions() {
    return this.item.versions.map((version: any) => {
      return {
        value: version.version,
        label: version.version,
      }
    })
  }

  mounted() {
    ;['name', 'version', 'category', 'website', 'description'].forEach((key: string) => {
      ;(this.formModel as any)[key] = (this.item as any)[key]
    })
  }
  async onSubmit() {
    await this.$refs.formModel.validate()
    await this.$api.datum.update(this.item.data_id, this.formModel).then(() => {
      this.$store.commit('datum/UPDATE_CURRENT_STORE', this.formModel)
    })
  }
}
</script>
