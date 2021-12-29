<template>
  <el-select v-model="actualValue" v-loading="loading" class="w-100" multiple placeholder="按分类筛选" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name" />
  </el-select>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { CategoryModel } from '@/types/model/Common'

@Component
export default class CategorySelectMultiple extends Vue {
  @Prop({ required: true })
  type!: string
  @Prop({
    required: true,
    default() {
      return []
    },
  })
  value!: string[]
  loading = false
  options: CategoryModel[] = []

  get actualValue(): string[] {
    return this.value
  }
  set actualValue(value: string[]) {
    this.$emit('input', value)
  }

  async mounted(): Promise<any> {
    this.loading = true
    this.options = await this.$api.common.getTags(this.type).finally(() => (this.loading = false))
  }
}
</script>
