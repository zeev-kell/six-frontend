<template>
  <div v-if="showPanel" class="cwl-params-panel right-panel">
    <div class="card-header">
      <div class="f-b text-truncate" :title="labelName">
        {{ labelName }}
      </div>
      <button type="button" class="el-dialog__headerbtn" style="top: 15px" @click="showPanel = false">
        <i class="el-dialog__close el-icon el-icon-close" />
      </button>
    </div>
    <div class="card-body scrollbar">
      <el-tabs v-if="isStep" v-model="activeTabName">
        <el-tab-pane label="详情" name="info">
          <selection-step-info :step="selectionNode" />
        </el-tab-pane>
        <el-tab-pane label="输入" name="input">
          <selection-step-inputs :step="selectionNode" :readonly="readonly" :workflow-model="workflow.model" @onUpdate="onUpdateWorkflow" />
        </el-tab-pane>
        <el-tab-pane label="步骤" name="step">
          <selection-step
            :step="selectionNode"
            :workflow="workflow"
            :workflow-model="workflow.model"
            :readonly="readonly"
            @onUpdate="onUpdateStep()"
          />
        </el-tab-pane>
      </el-tabs>
      <div v-else>
        <selection-step-io
          :step="selectionNode"
          :workflow-model="workflow.model"
          :workflow="workflow"
          :readonly="readonly"
          @onUpdate="onUpdateWorkflow"
        />
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import SelectionStep from '@/pages/application/_components/graph/SelectionStep'
import SelectionStepInfo from '@/pages/application/_components/graph/SelectionStepInfo'
import SelectionStepInputs from '@/pages/application/_components/graph/SelectionStepInputs'
import SelectionStepIo from '@/pages/application/_components/graph/SelectionStepIo'
import { StepModel } from 'cwlts/models/generic/StepModel'
import CwlPanelMixin from '@/pages/application/_components/graph/CwlPanelMixin'

export default {
  name: 'CwlPanelParams',
  components: { SelectionStepIo, SelectionStep, SelectionStepInfo, SelectionStepInputs },
  mixins: [CwlPanelMixin],
  computed: {
    isStep() {
      return this.selectionNode instanceof StepModel
    },
  },
  methods: {
    onUpdateWorkflow() {
      this.workflow.draw()
    },
    onUpdateStep() {
      // eslint-disable-next-line no-console
      console.log(arguments)
    },
    onDblClick(element) {
      if (element && typeof element !== 'string') {
        // 选择了节点 node
        const id = element.getAttribute('data-connection-id')
        const selected = this.workflow.model.findById(id)
        this.showNodeInfo(selected)
      }
    },
    showNodeInfo(selectionNode) {
      if (this.selectionNode?.id !== selectionNode.id) {
        this.selectionNode = selectionNode
        this.activeTabName = 'input'
      }
      this.showPanel = true
    },
  },
}
</script>

<style scoped lang="scss" rel="stylesheet">
@import '_theme';
.el-tabs ::v-deep {
  height: 100%;

  .el-tabs__nav {
    width: 100%;
    display: flex;
  }
  .el-tabs__item {
    flex: 1;
    color: #bbbbbb;
    padding: 0 !important;
    text-align: center;
    &.is-active {
      color: white;
    }
  }
  .el-tabs__nav-wrap::after {
    background-color: $b-color;
    height: 1px;
  }
  .el-tabs__active-bar {
    height: 1px;
  }
  .el-tabs__content {
    height: calc(100% - 40px - 15px);

    /*height: calc(100vh - 47px - 30px - 40px - 15px);*/
  }
}
</style>
