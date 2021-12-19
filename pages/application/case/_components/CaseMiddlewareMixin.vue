<script lang="ts">
/* eslint-disable camelcase */
import { Component, Vue } from 'nuxt-property-decorator'
import { CaseModel } from '@/types/model/Case'

@Component({
  async middleware({ store, params, app }) {
    const item: CaseModel = store.state.case
    // ID 不同，需要重新请求数据
    if (params.id !== item.id?.toString()) {
      const item = await app.$api.case.get(params.id)
      store.commit('case/UPDATE_CURRENT_STORE', item)
    }
  },
})
export default class CaseMiddlewareMixin extends Vue {}
</script>
