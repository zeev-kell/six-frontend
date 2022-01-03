<template>
  <div class="container-fluid">
    <div v-if="item.profile" class="el-row el-row--flex">
      <div class="el-col el-col-18 pr-20">
        <div class="card">
          <div class="card-header el-row--flex is-align-middle">
            <h2 class="mx-0 el-col-equal">双击图标查看案例参数</h2>
          </div>
          <div class="card-body">
            <div class="page-graph-box">
              <graph-index
                ref="graph"
                class="h-100"
                :item="graphItem"
                config-type="run"
                tools="import-case|download|plus,minus,fit"
                @propagate-event="onPropagate"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="el-col- el-col-6">
        <div class="card">
          <div class="card-header el-row el-row--flex is-align-middle py-5">
            <h4>引用自</h4>
          </div>
          <div class="card-body">
            <div style="font-weight: 600; margin-bottom: 10px">
              {{ caseItem.type | caseTypeTranslate | t({ prefix: 'constant.' }) }}
            </div>
            <nuxt-link class="text-truncate" :to="localePath('/application/case/' + item.profile)" :title="caseItem.name">
              {{ caseItem.name }}
            </nuxt-link>
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

@Component({
  filters: {
    caseTypeTranslate: caseConstants.get,
  },
  components: { GraphIndex },
  async asyncData({ app, store }: Context): Promise<any> {
    const item: PipeModel = store.state.pipe
    let caseItem = {}
    if (item.profile) {
      caseItem = await app.$api.case.get(item.profile)
    }
    return { caseItem }
  },
})
export default class Case extends PipeItemMixin {
  $refs!: {
    graph: HTMLFormElement
  }
  caseItem: any = {}
  get content(): CaseContent {
    if (this.caseItem.content === '') {
      return {} as CaseContent
    }
    try {
      return JSON.parse(this.caseItem.content)
    } catch (e) {
      console.log(e)
      return {} as CaseContent
    }
  }
  get graphItem() {
    return {
      content: this.content.workflow,
    }
  }
  onPropagate(eventName: string): void {
    // 监听第一次实例化事件
    if (GraphEvent.TriggerPageModalCreate === eventName) {
      this.$nextTick(() => {
        this.$refs.graph.dispatchAction('updateJob', this.content.input)
      })
    }
  }
}
</script>
