<template>
  <div class="container-fluid card">
    <div class="card-body el-row">
      <div class="el-col-12">
        <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formModel.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="版本" prop="version">
            <el-select v-model="formModel.version" placeholder="请输入版本" disabled>
              <el-option v-for="version in versions" :key="version.value" :label="version.label" :value="version.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-input v-model="formModel.category" placeholder="请输入分类" />
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
import PipeItemMixin from '@/pages/application/pipe/_id/_components/PipeItemMixin.vue'

@Component({
  components: { LoadingButton },
})
export default class Setting extends PipeItemMixin {
  $refs!: {
    formModel: HTMLFormElement
  }
  formModel = {}
  rules = {
    name: [
      { required: true, message: '请输入名称', trigger: 'blur' },
      { min: 2, max: 128, message: '长度在 2 到 128 个字符', trigger: 'blur' },
    ],
    // version: [{ required: true, message: '请选择默认版本', trigger: 'blur' }],
    category: [
      { required: true, message: '请输入分类', trigger: 'blue' },
      { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    ],
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
    this.formModel = ['name', 'version', 'category', 'website', 'description'].reduce((obj: any, key: string) => {
      obj[key] = (this.item as any)[key]
      return obj
    }, {})
  }
  async onSubmit() {
    await this.$refs.formModel.validate()
    await this.$api.pipe.update(this.item.pipe_id, this.formModel).then(() => {
      this.$store.commit('pipe/UPDATE_CURRENT_WORKFLOW', this.formModel)
    })
  }
}
</script>
