<template>
  <div class="container-fluid">
    <div v-if="graphItem" class="el-row el-row--flex">
      <div class="el-col el-col-18 pr-20">
        <div class="panel">
          <div class="panel-header el-row--flex is-align-middle">
            <h2 class="mx-0 el-col-equal">双击图标查看案例参数</h2>
          </div>
          <div class="panel-body">
            <div class="workflow-box">
              <graph-index
                ref="graph"
                class="h-100"
                :item="graphItem"
                config-type="run"
                tools="download|plus,minus,fit"
                @trigger-modal-create="onModalCreate"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="el-col- el-col-6">
        <div class="panel">
          <div class="panel-header el-row el-row--flex is-align-middle py-5">
            <h4>引用自</h4>
          </div>
          <div class="panel-body">
            <div style="font-weight: 600; margin-bottom: 10px">{{ graphItem.type | pipeTypeTranslate | t }}</div>
            <nuxt-link class="text-truncate" :to="localePath('/application/pipe/' + item.cwl)" :title="item.cwl">
              {{ graphItem.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>暂无运行案例</div>
  </div>
</template>

<script type="text/babel">
import { GraphEvent } from '@/constants/GraphEvent'
import pipeConstants from '@/constants/PipeConstants'
import GraphIndex from '@/pages/application/_components/graph/GraphIndex'
import { getObject } from '@/pages/application/_components/graph/plugins/yaml-handle'

export default {
  filters: {
    pipeTypeTranslate: pipeConstants.translate.bind(pipeConstants),
  },
  components: { GraphIndex },
  async asyncData({ app, store }) {
    const item = store.state.pipe
    if (item.cwl) {
      // 请求 graph 数据
      const graphItem = await app.$axios.$get(`/v2/pipe/${item.cwl}`)
      return { graphItem }
    }
  },
  data() {
    return {
      graphItem: undefined,
    }
  },
  computed: {
    item() {
      return this.$store.state.pipe
    },
  },
  methods: {
    onModalCreate() {
      const job = getObject(this.item?.content || {})
      this.$nextTick(() => {
        this.$refs.graph.$emit(GraphEvent.Dispatch, GraphEvent.PayloadUpdateJob, job)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.workflow-box {
  min-height: 450px;
  height: calc(100vh - 60px);
}
</style>
