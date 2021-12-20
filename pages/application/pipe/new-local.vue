<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import PipeNewPage from '@/pages/application/pipe/new.vue'
import { getStore, removeStore } from '@/utils/local-storage'
import { pipeConstants, PIPE_LOCAL } from '@/constants/PipeConstants'

@Component
export default class newLocal extends PipeNewPage {
  disabledType = true

  mounted(): void {
    this.formModel.content = getStore(PIPE_LOCAL, true)
    this.formModel.type = pipeConstants.items.TYPE_APP
  }

  async onSubmit() {
    await this.$refs.formModel.validate()
    await this.$api.pipe.create(this.formModel).then((data) => {
      removeStore(PIPE_LOCAL)
      const id = data?.data?.id
      this.$I18nRouter.push(`/application/pipe/${id}/edit`)
    })
  }
}
</script>
