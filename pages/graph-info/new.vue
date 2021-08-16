<template>
  <graph-index ref="graphIndex" class="h-100v" :item="item" tools="download|plus,minus,fit|auto" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import { Generator } from '@/pages/_components/Graph/Generator'
import { pipeConstants } from '@/constants/PipeConstants'

@Component({
  components: { GraphIndex },
  asyncData() {
    const content = Generator.generateWorkflow()
    return {
      item: {
        content,
        type: pipeConstants.items.TYPE_APP,
      },
    }
  },
})
export default class GraphInfoNew extends Vue {
  item = null
}
</script>
