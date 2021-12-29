<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseSelect from '@/pages/application/_components/BaseSelect.vue'
import { SelectModel } from '@/types/model/Common'
import { PipeModel } from '@/types/model/Pipe'
import { pipeConstants } from '@/constants/PipeConstants'

@Component
export default class PipeSelect extends BaseSelect {
  defaultPlaceholder = '选择应用'

  get actualValue() {
    return this.value
  }
  set actualValue(value) {
    this.$emit('input', value)
    // 清空或者选择无效
    if (!value) {
      return
    }
    try {
      this.$emit(
        'on-change',
        this.options.find((o) => o.value === value)
      )
    } catch (e) {
      console.log(e)
    }
  }

  async getOptions(): Promise<SelectModel[]> {
    const { data } = await this.$api.pipe.search({
      page: 1,
      size: 1000,
      term: `type:${pipeConstants.items.TYPE_TOOL} OR type:${pipeConstants.items.TYPE_APP}`,
    })
    return data
      .filter((d) => (d.resource_id as unknown) !== null)
      .map((d: PipeModel): SelectModel => {
        return {
          id: d.pipe_id,
          pipe_id: d.pipe_id,
          value: d.resource_id,
          label: d.name,
        }
      })
  }
}
</script>
