<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { tableQuery } from '@/types/response'
import { PipeModel } from '@/types/model/Pipe'
import { pipeConstants } from '@/constants/PipeConstants'
import DragListShop from '@/pages/_components/Graph/components/DragListShop.vue'

@Component
export default class DragListMine extends DragListShop {
  protected listQuery: any = {
    provider: this.$store.getters['user/username'],
  }
  protected listQueryKeys: string[] = ['name']
  protected filterPipe(p: PipeModel): boolean {
    return (p.type === 0 || p.type === 1) && !!p.resource_id && p.provider === this.listQuery.provider
  }
}
</script>
