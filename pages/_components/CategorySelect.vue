<template>
  <el-select v-model="actualValue" placeholder="按分类筛选" clearable v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
  </el-select>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Prop } from 'vue-property-decorator'

@Component
export default class CategorySelect extends Vue {
  @Prop({ required: true })
  type!: string
  @Prop({ required: true })
  value!: any
  get actualValue() {
    return this.value === '' ? '' : Number(this.value)
  }
  set actualValue(value) {
    this.$emit('input', value)
  }

  categoryList: { id: string; name: string }[] = []
  async mounted(): Promise<any> {
    this.categoryList = await this.$api.common.getTags({
      type: this.type,
    })
  }
}
</script>
