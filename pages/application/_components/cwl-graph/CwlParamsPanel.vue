<template>
  <div v-if="showPanel" class="cwl-params-panel">
    <div class="panel-header">
      <div class="f-b text-truncate" :title="labelName">
        {{ labelName }}
      </div>
      <button type="button" class="el-dialog__headerbtn" style="top: 15px" @click="showPanel = false">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
    <div class="panel-body scrollbar">
      <el-tabs v-if="isStep" v-model="activeTabName">
        <el-tab-pane label="详情" name="info">
          <selection-step-info :step="selectionNode" />
        </el-tab-pane>
        <el-tab-pane label="输入" name="input">
          <selection-step-inputs
            :step="selectionNode"
            :readonly="readonly"
            :workflow-model="workflow.model"
            @onUpdate="onUpdateWorkflow"
          />
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
  import SelectionStep from '@/pages/application/_components/cwl-graph/SelectionStep'
  import SelectionStepInfo from '@/pages/application/_components/cwl-graph/SelectionStepInfo'
  import SelectionStepInputs from '@/pages/application/_components/cwl-graph/SelectionStepInputs'
  import SelectionStepIo from '@/pages/application/_components/cwl-graph/SelectionStepIo'
  import { WorkflowInputParameterModel } from 'cwlts/models/generic/WorkflowInputParameterModel'
  import { StepModel } from 'cwlts/models/generic/StepModel'
  import CwlPanel from '@/pages/application/_components/cwl-graph/CwlPanel'

  export default {
    name: 'CwlParamsPanel',
    components: { SelectionStepIo, SelectionStep, SelectionStepInfo, SelectionStepInputs },
    mixins: [CwlPanel],
    computed: {
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
    methods: {
      onUpdateWorkflow() {
        this.workflow.draw()
      },
      onUpdateStep() {
        // eslint-disable-next-line no-console
        console.log(arguments)
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  @import '_theme';
  .cwl-params-panel {
    width: 360px;
    background: #3c3c3c;
    border-left: 1px solid $b-color;
    padding-left: 5px;
    padding-right: 5px;
    color: $color2;
    overflow: hidden;
    flex: 0 0 auto;
    height: 100%;
  }
  .panel-header {
    border-color: $b-color;
    color: $color1;
  }
  .panel-body {
    height: calc(100% - 47px);
  }
  .el-tabs /deep/ {
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

<style lang="scss" rel="stylesheet">
  @import '_theme';
  .cwl-params-panel {
    label {
      display: inline-block;
      margin-bottom: 0.5rem;
      padding: 0 !important;
      height: 20px;
      line-height: 1;
      color: #eee;
    }
    .form-control {
      display: block;
      width: 100%;
      padding: 0.4rem 0.55rem;
      font-size: 12px;
      line-height: 1rem;
      color: #eee;
      background-color: $black2;
      background-image: none;
      background-clip: padding-box;
      border: 1px solid $black1;
      border-radius: 0;
      &:focus {
        color: #eee;
        background-color: #333333;
        border-color: #66afe9;
        outline: none;
      }
    }
    select.form-control,
    input.form-control {
      &:not([size]):not([multiple]) {
        height: calc(2.5rem - 2px);
      }
    }
    .el-form-item {
      margin-bottom: 1rem;
      &.is-error .form-control-feedback,
      &.is-error .el-form-item__label,
      &.is-error .form-check-label,
      &.is-error .form-check-inline,
      &.is-error .custom-control {
        color: #dd4a38;
      }
      &.is-error .form-control {
        border-color: #dd4a38;
      }
      .el-form-item__error {
        position: relative;
        top: 0;
      }
    }
    .el-switch__core {
      border-color: $black1 !important;
    }
    .input-box {
      padding-top: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid $black1;
    }
    .selection-step-inputs {
      color: #eee;
    }
    .el-input__inner {
      height: 33px !important;
      background: $black2;
      border-color: $black1;
    }
    .is-disabled .el-input__inner {
      background: $black2 !important;
      border-color: $black1 !important;
    }
    .el-select {
      background: transparent;
      width: 100%;
      &:hover .el-input__inner {
        border-color: $t-color;
      }
    }
    .el-tag {
      background: #337cb9;
      border-color: #296394;
      color: #ffffff;
    }
    .el-tag__close {
      background: transparent !important;
      color: white !important;
    }
  }
</style>
