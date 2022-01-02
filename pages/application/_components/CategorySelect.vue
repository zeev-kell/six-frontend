<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import { SelectModel } from '@/types/model/Common'
import BaseSelect from '@/pages/application/_components/BaseSelect.vue'

@Component
export default class CategorySelect extends BaseSelect {
  @Prop({ required: true })
  type!: string
  defaultPlaceholder = '按分类筛选'

  get actualValue() {
    if (!this.value) {
      return []
    }
    if (typeof this.value === 'string') {
      console.log(this.value)
      return [this.value]
    }
    return this.value.map((c: any) => (typeof c === 'string' ? c : c.name))
  }
  set actualValue(value) {
    this.$emit('input', value)
  }

  async getOptions(): Promise<SelectModel[]> {
    const list = await this.$api.common.getTags(this.type)
    return list.map((d: any): SelectModel => {
      return {
        id: d.id,
        value: d.name,
        label: d.name,
      }
    })
  }
}
</script>
