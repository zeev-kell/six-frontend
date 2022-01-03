<template>
  <div class="container-fluid card">
    <div class="card-header el-row el-row--flex">
      <div class="el-col-full">
        <h2 class="mx-0 el-col-equal">双击图标为应用配置参数范例，或者导入配置</h2>
      </div>
      <div class="el-col-auto">
        <loading-button :callback="onSubmit" type="success" icon="el-icon-check"> 保存 </loading-button>
      </div>
    </div>
    <div class="card-body">
      <graph-index
        ref="graphIndex"
        class="h-100v"
        :item="item"
        config-type="run"
        tools="import-case|download|plus,minus,fit"
        @propagate-event="onPropagate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { pipeConstants } from '@/constants/PipeConstants'
import LoadingButton from '@/components/LoadingButton.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'
import CaseSelect from '@/pages/application/_components/CaseSelect.vue'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import { GraphEvent } from '@/constants/GraphEvent'
import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'

@Component({
  components: { GraphIndex, CaseSelect, LoadingButton },
})
export default class Case extends PipeItemMixin {
  $refs!: {
    graphIndex: GraphIndex
  }
  get jobValue(): any {
    return this.$store.state.graph.jobValue
  }
  onPropagate(eventName: string): void {
    if (GraphEvent.TriggerPageModalCreate === eventName) {
      const profile = this.item.profile
      const job = profile && profile.length === 36 ? {} : getObject(profile)
      this.$nextTick(() => {
        this.$refs.graphIndex.dispatchAction('updateJob', job)
      })
    }
  }
  async onSubmit(): Promise<void> {
    const data = { profile: JSON.stringify(this.jobValue) }
    await this.$api.pipe.updateRevision(this.item.pipe_id, this.item.resource_id, data).then(() => {
      this.$store.commit('pipe/UPDATE_CURRENT_STORE', data)
    })
  }
}
</script>
