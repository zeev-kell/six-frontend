<script lang="ts">
/* eslint-disable camelcase */
import { Component, Vue } from 'nuxt-property-decorator'
import { PipeModel } from '@/types/model/Pipe'

@Component({
  async middleware({ store, params, app }) {
    const pipe: PipeModel = store.state.pipe
    // ID 不同，需要重新请求数据
    if (params.id !== pipe.resource_id) {
      const item = await app.$api.pipe.getVersion(params.id)
      if (item.readme?.by_system) {
        item.readme.by_system = item.readme.by_system?.replace(/[↵ ]{2,}/g, '  \n')
      }
      if (item.readme?.by_author) {
        item.readme.by_author = item.readme.by_author?.replace(/[↵ ]{2,}/g, '  \n')
      }
      item.tutorial = item.tutorial?.replace(/[↵ ]{2,}/g, '  \n')
      store.commit('pipe/UPDATE_CURRENT_WORKFLOW', item)
    }
  },
})
export default class PipeMiddlewareMixin extends Vue {}
</script>
