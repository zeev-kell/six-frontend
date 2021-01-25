<template>
  <div class="container-fluid">
    <div class="panel">
      <div class="panel-header el-row">
        <h2 class="el-col el-col-12 text-truncate mx-0">
          {{ item['workflow_name'] }}
        </h2>
      </div>
      <div class="panel-body w-info">
        <div class="el-row">
          <label class="el-col el-col-2">ID</label>
          <div class="el-col el-col-equal">{{ item['workflow_id'] }}</div>
        </div>
        <div class="el-row">
          <label class="el-col el-col-2">版本</label>
          <div class="el-col el-col-equal">{{ item['version'] }}</div>
        </div>
        <div class="el-row">
          <label class="el-col el-col-2">发布人</label>
          <div class="el-col el-col-equal">{{ item['provider'] }}</div>
        </div>
        <div class="el-row">
          <label class="el-col el-col-2">发布时间</label>
          <div class="el-col el-col-equal">{{ item['public_time'] }}</div>
        </div>
        <hr />
        <div class="el-row">
          <label class="el-col el-col-2 mb-10">描述</label>
          <div class="col-100"></div>
          <div class="el-col el-col-24">
            {{
              Array.from({ length: 30 })
                .map(() => item.description)
                .join(' ')
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body w-cwl">
        <workflow-cwl cwl-url="/rna-seq-alignment.json" :plugins="plugins"></workflow-cwl>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import WorkflowCwl from '@/components/WorkflowCwl'
  import { SVGArrangePlugin } from 'cwl-svg/compiled/src/plugins/arrange/arrange'
  import { SVGNodeMovePlugin } from 'cwl-svg/compiled/src/plugins/node-move/node-move'
  import { SVGPortDragPlugin } from 'cwl-svg/compiled/src/plugins/port-drag/port-drag'
  import { SelectionPlugin } from 'cwl-svg/compiled/src/plugins/selection/selection'
  import { SVGEdgeHoverPlugin } from 'cwl-svg/compiled/src/plugins/edge-hover/edge-hover'
  import { ZoomPlugin } from 'cwl-svg/compiled/src/plugins/zoom/zoom'

  export default {
    components: {
      WorkflowCwl,
    },
    async asyncData({ app, params }) {
      const item = await app.$axios.$get(`/workflow/${params.id}`)
      return { item }
    },
    data() {
      return {
        item: {},
        plugins: [
          new SVGArrangePlugin(),
          new SVGEdgeHoverPlugin(),
          new SVGNodeMovePlugin({
            movementSpeed: 10,
          }),
          new SVGPortDragPlugin(),
          new SelectionPlugin(),
          new ZoomPlugin(),
        ],
      }
    },
  }
</script>

<style lang="scss" scoped>
  .w-info {
    .el-row {
      margin-bottom: 10px;
    }
    label {
      font-weight: bold;
    }
  }
  .w-cwl {
    min-height: 400px;
    height: 400px;
  }
</style>
