<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import SetRunPage from '@/pages/graph-info/_id/set-run.vue'
import { pipeConstants } from '@/constants/PipeConstants'
import { getStore } from '@/utils/local-storage'
import { S4, uuid } from '@/utils/uuid'

@Component({
  asyncData() {
    return {
      item: {
        type: pipeConstants.items.TYPE_APP,
        content: getStore('graph-content', true),
        name: S4(),
        resource_id: uuid(),
      },
    }
  },
})
export default class setRunLocal extends SetRunPage {
  profile = null
}
</script>
