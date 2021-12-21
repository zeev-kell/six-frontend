<template>
  <el-select v-model="actualValue" placeholder="按分类筛选" clearable v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.name" />
  </el-select>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { CategoryModel } from '@/types/model/Common'

@Component
export default class CategorySelect extends Vue {
  @Prop({ required: true })
  type!: string
  @Prop({ required: true })
  value!: string
  get actualValue() {
    return this.value
  }
  set actualValue(value) {
    this.$emit('input', value)
  }

  categoryList: CategoryModel[] = []
  async mounted(): Promise<any> {
    this.categoryList = await this.$api.common.getTags(this.type)
  }
}
</script>
