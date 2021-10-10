<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseTable from '@/pages/application/_components/BaseTable.vue'

@Component({
  async asyncData({ app }) {
    const items = await app.$api.user.getPipes()
    return { items }
  },
})
export default class PipePage extends BaseTable {}
</script>
