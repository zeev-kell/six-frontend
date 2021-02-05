<template>
  <div v-if="showPanel" class="workflow-panel">
    <div class="panel-header">
      <div class="f-b text-truncate" :title="selectionNode.label">
        {{ selectionNode.label }}
      </div>
      <button type="button" class="el-dialog__headerbtn" style="top: 15px" @click="showPanel = false">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
    <div v-if="isStep" class="panel-body">
      <el-tabs v-model="activeTabName">
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
          <el-collapse :value="['1', '2']">
            <el-collapse-item title="Files" name="1">
              <div v-for="i of selectionNode.in" :key="i.id" style="padding: 5px">
                {{ i.type }}
              </div>
            </el-collapse-item>
            <el-collapse-item title="APP PARAMETERS" name="2">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
          </el-collapse>
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
    </div>
  </div>
</template>

<script type="text/babel">
  import marked from '@/directives/marked'
  import { SBDraft2WorkflowInputParameterModel } from 'cwlts/models/d2sb/SBDraft2WorkflowInputParameterModel.js'
  import { SBDraft2WorkflowOutputParameterModel } from 'cwlts/models/d2sb/SBDraft2WorkflowOutputParameterModel.js'

  export default {
    name: 'WorkflowPanel',
    directives: {
      ...marked,
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
      isInput() {
        return this.selectionNode instanceof SBDraft2WorkflowInputParameterModel
      },
      isOutput() {
        return this.selectionNode instanceof SBDraft2WorkflowOutputParameterModel
      },
      isStep() {
        return this.selectionNode?.constructor.name === 'SBDraft2StepModel'
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
    background: #383838;
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
      border-bottom: 1px solid $b-color;
    }
    .el-collapse-item__content {
      color: #bbbbbb;
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
