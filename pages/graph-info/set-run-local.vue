<template>
  <graph-index class="h-100v" :item="item" config-type="run" tools="download|plus,minus,fit" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import { pipeConstants } from '@/constants/PipeConstants'
import { getStore } from '@/utils/local-storage'
import { S4, uuid } from '@/utils/uuid'

@Component({
  components: { GraphIndex },
})
export default class setRunLocal extends Vue {
  item = {
    type: pipeConstants.items.TYPE_APP,
    content: null,
    name: S4(),
    resource_id: uuid(),
  }

  mounted(): void {
    ;(this.item as any).content = getStore('graph-content', true)
  }
}
</script>
