<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { tableQuery } from '@/types/response'
import { PipeModel } from '@/types/model/Pipe'
import { pipeConstants } from '@/constants/PipeConstants'
import DragListShop from '@/pages/_components/Graph/components/DragListShop.vue'

@Component
export default class DragListMine extends DragListShop {
  protected listQuery: tableQuery = {
    page: 1,
    size: 10000,
    name: undefined,
    status: pipeConstants.items.STATUS_ON,
    provider: this.$store.getters['user/username'],
  }
  protected listQueryKeys: string[] = ['name']
  protected filterPipe(p: PipeModel): boolean {
    return (p.type === 0 || p.type === 1) && (p.content || p.versions?.length > 0) && p.provider === this.listQuery.provider
  }
}
</script>
