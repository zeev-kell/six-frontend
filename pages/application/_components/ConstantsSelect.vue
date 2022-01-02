<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseSelect from '@/pages/application/_components/BaseSelect.vue'
import { ItemList } from '@/types/constant'

@Component
export default class ConstantsSelect extends BaseSelect {
  typeList: ItemList = []
  getOptions(): Promise<any> {
    return Promise.resolve(
      this.typeList.map((t, index) => ({
        id: index,
        value: t.value,
        label: this.$t('constant.' + t.label),
      }))
    )
  }
}
</script>
