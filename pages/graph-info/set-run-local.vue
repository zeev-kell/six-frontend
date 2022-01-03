<template>
  <graph-index class="h-100v" :is-wheel="true" :item="item" config-type="run" left-tools="saveCase" tools="import-case|download|plus,minus,fit" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import { pipeConstants, PIPE_LOCAL } from '@/constants/PipeConstants'
import { getStore } from '@/utils/local-storage'
import { S4, uuid4 } from '@/utils/uuid'
import { PipeModel } from '@/types/model/Pipe'

@Component({
  components: { GraphIndex },
})
export default class setRunLocal extends Vue {
  item = {
    type: pipeConstants.items.TYPE_APP,
    content: null,
    name: S4(),
    resource_id: uuid4(),
  } as PipeModel

  mounted(): void {
    this.item.content = getStore(PIPE_LOCAL, true)
  }
}
</script>
