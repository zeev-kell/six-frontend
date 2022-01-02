<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseSelect from '@/pages/application/_components/BaseSelect.vue'
import { SelectModel } from '@/types/model/Common'

@Component
export default class CaseSelect extends BaseSelect {
  defaultPlaceholder = '选择案例'
  async getOptions(): Promise<SelectModel[]> {
    const list = await this.$api.case.getList()
    return list.map((d: any): SelectModel => {
      return {
        id: d.resource_id,
        value: d.resource_id,
        label: d.name,
      }
    })
  }
}
</script>
