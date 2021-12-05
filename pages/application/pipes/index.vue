<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseTable from '@/pages/application/_components/BaseTable.vue'

@Component({
  async asyncData({ app }) {
    const items = await app.$api.pipe.getList()
    return { items }
  },
})
export default class PipeList extends BaseTable {}
</script>
