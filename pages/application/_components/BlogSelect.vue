<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseSelect from '@/pages/application/_components/BaseSelect.vue'
import { SelectModel } from '@/types/model/Common'

@Component
export default class BlogSelect extends BaseSelect {
  defaultPlaceholder = '引用知识库文档'

  async getOptions(): Promise<SelectModel[]> {
    const list = await this.$api.blog.getList()
    return list.map((d: any): SelectModel => {
      return {
        id: d.resource_id,
        value: d.resource_id,
        label: d.title,
      }
    })
  }
}
</script>
