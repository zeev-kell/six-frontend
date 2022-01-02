<script lang="ts">
/* eslint-disable camelcase */
import { Component, Vue } from 'nuxt-property-decorator'
import { PipeRepositoryModel } from '@/types/model/Pipe'

@Component({
  async middleware({ store, params, app }) {
    const pipe: PipeRepositoryModel = store.state.pipeRepository
    // ID 不同，需要重新请求数据
    if (params.id !== pipe.pipe_id) {
      const item = await app.$api.pipe.getRepository(params.id)
      item.readme = item.readme?.replace(/[↵ ]{2,}/g, '  \n')
      store.commit('pipeRepository/UPDATE_CURRENT_STORE', item)
    }
  },
})
export default class PipeMiddlewareMixin extends Vue {}
</script>
