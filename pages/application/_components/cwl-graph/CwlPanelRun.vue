<template>
  <div v-if="showPanel" class="cwl-run-panel">
    <div class="panel-header">
      <div class="f-b text-truncate" :title="labelName">
        {{ labelName }}
      </div>
      <button type="button" class="el-dialog__headerbtn" style="top: 15px" @click="showPanel = false">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
    <div class="panel-body scrollbar">
      <job-step-inspector
        ref="jobStepInspector"
        :job-control="jobControl"
        :workflow-model="workflow.model"
        :step-inputs="inspectedInputs"
        :relative-path-root="relativePathRoot"
      />
    </div>
  </div>
</template>

<script type="text/babel">
  import CwlPanelMixin from '@/pages/application/_components/cwl-graph/CwlPanelMixin'
  import { AppHelper } from '@/pages/application/_components/cwl-graph/helpers/AppHelper'
  import { FormControl } from '@/pages/application/_components/FormControl'
  import JobStepInspector from '@/pages/application/_components/cwl-graph/JobStepInspector'

  export default {
    name: 'CwlRunPanel',
    components: { JobStepInspector },
    mixins: [CwlPanelMixin],
    props: {
      jobControl: {
        type: Object,
        default() {
          return new FormControl({})
        },
      },
    },
    data() {
      return {
        inspectedInputs: [],
      }
    },
    computed: {
      relativePathRoot() {
        return AppHelper.isLocal(this.pipeId) ? AppHelper.getDirname(this.pipeId) : undefined
      },
    },
    methods: {
      // openNodeInInspector
      onDblClick(element) {
        if (!element || typeof element === 'string') {
          return
        }
        let typeOfNode = 'steps'
        if (element.classList.contains('input')) {
          typeOfNode = 'inputs'
        } else if (element.classList.contains('output')) {
          typeOfNode = 'outputs'
        }
        this.selectionNode = this.workflow.model[typeOfNode].find(
          (input) => input.id === element.getAttribute('data-id')
        )
        switch (typeOfNode) {
          case 'inputs':
            this.inspectedInputs = [this.selectionNode]
            break
          case 'outputs':
            this.inspectedInputs = []
            break
          default:
            this.inspectedInputs = this.selectionNode.in.filter((n) => n.status === 'exposed')
            break
        }
        this.showPanel = true
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  @import '_theme';
  .cwl-run-panel {
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
</style>
