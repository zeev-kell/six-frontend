<template>
  <div class="container-fluid">
    <div v-if="graphItem.content" class="el-row el-row--flex">
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
                tools="download|plus,minus,fit"
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
              {{ graphItem.type | pipeTypeTranslate | t({ prefix: 'constant.' }) }}
            </div>
            <nuxt-link v-if="graphItem.source" class="text-truncate" :to="localePath('/application/pipe/' + graphItem.source)">
              {{ graphItem.source }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>暂无工作结构</div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { GraphEvent } from '@/constants/GraphEvent'
import { pipeConstants } from '@/constants/PipeConstants'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'
import { CommandLineTool } from 'cwlts/mappings/v1.0/CommandLineTool'
import { Workflow } from 'cwlts/mappings/v1.0'

@Component({
  filters: {
    pipeTypeTranslate: pipeConstants.get,
  },
  components: { GraphIndex },
})
export default class Work extends CaseItemMixin {
  $refs!: {
    graph: HTMLFormElement
  }

  get graphItem() {
    return {
      type: this.$store.getters['case/type'],
      content: this.content.workflow,
      version: this.content.version,
      input: this.content.input,
      source: this.content.source,
    }
  }

  onPropagate(eventName: string): void {
    // TODO 修改为事件
    // 监听第一次实例化事件
    if (GraphEvent.TriggerPageModalCreate === eventName) {
      const job = getObject(this.graphItem.input || {})
      this.$nextTick(() => {
        this.$refs.graph.$emit(GraphEvent.Dispatch, GraphEvent.PayloadUpdateJob, job)
      })
    }
  }
}
</script>
