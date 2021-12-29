<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'
import { SelectModel } from '@/types/model/Common'
import BaseSelect from '@/pages/application/_components/BaseSelect.vue'

@Component
export default class CategorySelect extends BaseSelect {
  @Prop({ required: true })
  type!: string
  defaultPlaceholder = '按分类筛选'

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
