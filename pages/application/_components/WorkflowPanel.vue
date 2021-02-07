<template>
  <div v-if="showPanel" class="workflow-panel">
    <div class="panel-header">
      <div class="f-b text-truncate" :title="labelName">
        {{ labelName }}
      </div>
      <button type="button" class="el-dialog__headerbtn" style="top: 15px" @click="showPanel = false">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
    <div class="panel-body">
      <el-tabs v-if="isStep" v-model="activeTabName">
        <el-tab-pane label="详情" name="info" class="info-wrap">
          <div><label>TYPE:</label>{{ run.class }}</div>
          <div><label>CWL VERSION:</label>{{ run.cwlVersion }}</div>
          <div><label>REVISION:</label>{{ customProps['sbg:latestRevision'] }}</div>
          <div><label>TOOLKIT:</label>{{ customProps['sbg:toolkit'] + ' ' + customProps['sbg:toolkitVersion'] }}</div>
          <div><label>AUTHOR:</label>{{ customProps['sbg:createdBy'] }}</div>
          <div><label>SOURCE:</label>{{ customProps['sbg:project'] }}</div>
          <div>
            <label>DESCRIPTION:</label>
            <div v-marked="run.description"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="输入" name="input">
          <selection-step-inputs :step="selectionNode" @update="updateWorkflow"></selection-step-inputs>
        </el-tab-pane>
        <el-tab-pane label="步骤" name="step" class="step-wrap">
          <div>
            <label>ID</label>
            <div class="el-form-item__content">{{ selectionNode.id }}</div>
          </div>
          <div>
            <label>Label</label>
            <div class="el-form-item__content">{{ selectionNode.label }}</div>
          </div>
          <div>
            <label>Description</label>
            <div class="el-form-item__content">{{ selectionNode.description }}</div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div v-else></div>
    </div>
  </div>
</template>

<script type="text/babel">
  import marked from '@/directives/marked'
  import { DblclickPlugin } from '@/pages/application/_components/plugins/dblclick-plugin'
  import SelectionStepInputs from '@/pages/application/_components/SelectionStepInputs'
  import { Workflow } from 'cwl-svg'
  import { WorkflowInputParameterModel } from 'cwlts/models/generic/WorkflowInputParameterModel'
  import { StepModel } from 'cwlts/models/generic/StepModel'

  export default {
    name: 'WorkflowPanel',
    components: { SelectionStepInputs },
    directives: {
      ...marked,
    },
    props: {
      workflow: {
        type: Workflow,
        default: null,
      },
    },
    data() {
      return {
        showPanel: false,
        selectionNode: undefined,
        activeTabName: undefined,
      }
    },
    computed: {
      run() {
        return this.selectionNode?.run
      },
      customProps() {
        return this.run?.customProps
      },
      isStep() {
        return this.selectionNode instanceof StepModel
      },
      typeOfSelectionNode() {
        if (this.selectionNode instanceof StepModel) {
          return 'Step'
        } else if (this.selectionNode instanceof WorkflowInputParameterModel) {
          return 'Input'
        } else {
          return 'Output'
        }
      },
      labelName() {
        return this.selectionNode.label || this.selectionNode.id || this.selectionNode.loc || this.typeOfSelectionNode
      },
    },
    watch: {
      workflow() {
        const selection = this.workflow?.getPlugin(DblclickPlugin)
        if (selection) {
          selection.registerOnDblClick((element) => {
            if (element && typeof element !== 'string') {
              // 选择了节点 node
              const id = element.getAttribute('data-connection-id')
              const selected = this.workflow.model.findById(id)
              this.showNodeInfo(selected)
            }
          })
        }
      },
    },
    methods: {
      showNodeInfo(selectionNode) {
        if (this.selectionNode?.id !== selectionNode.id) {
          this.selectionNode = selectionNode
          this.activeTabName = 'input'
        }
        this.showPanel = true
        // eslint-disable-next-line no-console
        console.log(selectionNode)
        // eslint-disable-next-line no-console
        console.log(this.workflow.model)
      },
      updateWorkflow() {
        // TODO redraw Workflow
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  $color1: #ddd;
  $color2: #999;
  $b-color: #222;
  .workflow-panel {
    width: 360px;
    background: #3c3c3c;
    border-left: 1px solid $b-color;
    padding-left: 5px;
    padding-right: 5px;
    color: $color2;
    overflow: hidden;
    flex: 0 0 auto;
  }

  .cl-hl {
    color: #ddd;
  }

  .panel-header {
    border-color: $b-color;
    color: $color1;
  }

  .el-tabs /deep/ {
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
      height: calc(100vh - 132px);
      overflow-y: auto;
      &::-webkit-scrollbar-track {
        border-radius: 8px;
        background-color: #454545;
      }
      &::-webkit-scrollbar {
        width: 8px;
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: #555;
      }
    }
  }

  .el-collapse /deep/ {
    border: none;

    .el-collapse-item__header {
      color: white;
      background-color: transparent;
      border: none;
    }
    .el-collapse-item__wrap {
      background-color: transparent;
      border-bottom: none;
    }
    .el-collapse-item__content {
      color: inherit;
      padding-bottom: 0;
    }
  }

  .info-wrap > div {
    margin-bottom: 10px;
    color: $color1;
    label {
      font-weight: bold;
      color: $color2;
      margin-right: 4px;
    }
  }
  .step-wrap > div {
    margin-bottom: 10px;
  }
</style>
