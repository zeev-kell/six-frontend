<template>
  <div v-if="showPanel" class="cwl-run-panel right-panel">
    <div class="panel-header">
      <div class="f-b text-truncate" :title="labelName">
        {{ labelName }}
      </div>
      <button type="button" class="el-dialog__headerbtn" style="top: 15px" @click="showPanel = false">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
    <div class="panel-body scrollbar">
      <job-step-inspector :workflow-model="workflow.model" :step-inputs="inspectedInputs" :relative-path-root="relativePathRoot" />
    </div>
  </div>
</template>

<script type="text/babel">
import CwlPanelMixin from '@/pages/application/_components/graph/CwlPanelMixin'
import { AppHelper } from '@/pages/application/_components/graph/helpers/AppHelper'
import JobStepInspector from '@/pages/application/_components/graph/JobStepInspector'

export default {
  name: 'CwlRunPanel',
  components: { JobStepInspector },
  mixins: [CwlPanelMixin],
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
      this.selectionNode = this.workflow.model[typeOfNode].find((input) => input.id === element.getAttribute('data-id'))
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
