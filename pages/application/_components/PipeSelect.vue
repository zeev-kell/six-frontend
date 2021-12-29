<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseSelect from '@/pages/application/_components/BaseSelect.vue'
import { SelectModel } from '@/types/model/Common'

@Component
export default class PipeSelect extends BaseSelect {
  defaultPlaceholder = '选择应用'

  get actualValue() {
    return this.value
  }
  set actualValue(value) {
    this.$emit('input', value)
    try {
      this.$emit(
        'on-change',
        this.options.find((o) => o.value === value)
      )
    } catch (e) {
      console.log(e)
    }
  }

  async getOptions(): SelectModel[] {
    const list = await this.$api.pipe.getSummary()
    return list.map((d: any): SelectModel => {
      return {
        id: d.pipe_id,
        pipe_id: d.pipe_id,
        value: d.resource_id || '5847e32d-127e-469b-9f7a-3e1b97f4625b',
        label: d.name,
      }
    })
  }
}
</script>
