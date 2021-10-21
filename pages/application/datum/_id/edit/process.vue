<template>
  <div class="container-fluid">
    <div v-if="graphItem" class="el-row el-row--flex">
      <div class="el-col el-col-18 pr-20">
        <div class="card">
          <div class="card-header el-row--flex is-align-middle">
            <h2 class="mx-0 el-col-equal">双击图标查看案例参数</h2>
          </div>
          <div class="card-body">
            <div class="workflow-box">
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
              {{ graphItem.type | pipeTypeTranslate | t }}
            </div>
            <nuxt-link class="text-truncate" :to="localePath('/application/pipe/' + pipeItem.cwl)" :title="pipeItem.cwl">
              {{ graphItem.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>暂无工作结构</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { pipeConstants } from '@/constants/PipeConstants'
import { GraphEvent } from '@/constants/GraphEvent'
import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import { PipeModel } from '@/types/model/Pipe'

@Component({
  filters: {
    pipeTypeTranslate: pipeConstants.get,
  },
  components: { GraphIndex },
  async asyncData({ app, store }) {
    const id = '25775232'
    if (id) {
      const pipeItem = await app.$api.pipe.getVersion(id)
      // 请求 graph 数据
      const graphItem = await app.$api.pipe.getVersion(pipeItem.cwl)
      return { graphItem, pipeItem }
    }
  },
})
export default class process extends Vue {
  $refs!: {
    graph: HTMLFormElement
  }

  graphItem!: PipeModel
  pipeItem!: PipeModel

  get item() {
    return this.$store.state.datum
  }

  onPropagate(eventName: string): void {
    // TODO 修改为事件
    // 监听第一次实例化事件
    if (GraphEvent.TriggerPageModalCreate === eventName) {
      const job = getObject(this.pipeItem.content || {})
      this.$nextTick(() => {
        this.$refs.graph.$emit(GraphEvent.Dispatch, GraphEvent.PayloadUpdateJob, job)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.workflow-box {
  min-height: 450px;
  height: calc(100vh - 60px);
}
</style>
