<template>
  <div class="container-fluid">
    <div v-if="item.profile">
      <div class="card">
        <div class="card-header el-row--flex is-align-middle">
          <h2 class="mx-0 el-col-equal">双击图标查看案例参数</h2>
        </div>
        <div class="card-body">
          <div class="page-graph-box">
            <graph-index
              ref="graphIndex"
              class="h-100"
              :item="item"
              config-type="run"
              tools="import-case|download|plus,minus,fit"
              @propagate-event="onPropagate"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>暂无运行案例</div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { GraphEvent } from '@/constants/GraphEvent'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'
import { Context } from '@nuxt/types'
import { CaseContent } from '@/types/model/Case'
import { caseConstants } from '@/constants/CaseConstants'
import { PipeModel } from '@/types/model/Pipe'
import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'

@Component({
  filters: {
    caseTypeTranslate: caseConstants.get,
  },
  components: { GraphIndex },
})
export default class Case extends PipeItemMixin {
  $refs!: {
    graphIndex: GraphIndex
  }
  caseItem: any = {}
  onPropagate(eventName: string): void {
    if (GraphEvent.TriggerPageModalCreate === eventName) {
      const profile = this.item.profile
      const job = profile && profile.length === 36 ? {} : getObject(profile)
      this.$nextTick(() => {
        this.$refs.graphIndex.dispatchAction('updateJob', job)
      })
    }
  }
}
</script>
