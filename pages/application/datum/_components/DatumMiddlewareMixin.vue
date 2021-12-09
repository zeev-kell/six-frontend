<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { DatumModel } from '@/types/model/Datum'

@Component({
  async middleware({ store, params, app }) {
    const datum: DatumModel = store.state.datum
    // ID 不同，需要重新请求数据
    if (params.id !== datum.resource_id) {
      const item = await app.$api.datum.get(params.id)
      store.commit('datum/UPDATE_CURRENT_STORE', item)
    }
  },
})
export default class DatumMiddlewareMixin extends Vue {}
</script>
