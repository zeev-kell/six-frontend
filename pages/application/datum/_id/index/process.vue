<template>
  <div class="container-fluid">
    <div v-if="graphItem" class="el-row el-row--flex">
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
            <nuxt-link class="text-truncate" :to="localePath('/application/pipe/' + jobItem.cwl)" :title="jobItem.cwl">
              {{ graphItem.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>暂无处理流程</div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { pipeConstants } from '@/constants/PipeConstants'
import { GraphEvent } from '@/constants/GraphEvent'
import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import { PipeModel } from '@/types/model/Pipe'
import { DatumModel } from '@/types/model/Datum'
import DatumItemMixin from '@/pages/application/datum/_components/DatumItemMixin.vue'

@Component({
  filters: {
    pipeTypeTranslate: pipeConstants.get,
  },
  components: { GraphIndex },
  async asyncData({ app, store }) {
    const item: DatumModel = store.state.datum
    const data: any = {}
    if (item.link_pipes) {
      const jobItem = await app.$api.pipe.getVersion(item.link_pipes)
      data.jobItem = jobItem
      if (jobItem.cwl) {
        data.graphItem = await app.$api.pipe.getVersion(jobItem.cwl)
      }
    }
    return data
  },
})
export default class DatumProcess extends DatumItemMixin {
  $refs!: {
    graph: HTMLFormElement
  }

  // 工作（流）
  jobItem: PipeModel | null = null
  // 图形数据
  graphItem: PipeModel | null = null

  onPropagate(eventName: string): void {
    // TODO 修改为事件
    // 监听第一次实例化事件
    if (GraphEvent.TriggerPageModalCreate === eventName) {
      const job = getObject(this.jobItem?.content || {})
      this.$nextTick(() => {
        this.$refs.graph.$emit(GraphEvent.Dispatch, GraphEvent.PayloadUpdateJob, job)
      })
    }
  }
}
</script>
