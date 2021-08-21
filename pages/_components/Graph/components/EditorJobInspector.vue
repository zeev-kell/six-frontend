<template>
  <transition name="el-fade-in-linear">
    <div v-if="showPanel" class="cwl-run-panel right-panel">
      <div class="card-header">
        <div class="f-b text-truncate" :title="labelName">
          {{ labelName }}
        </div>
        <button type="button" class="el-dialog__headerbtn" style="top: 15px" @click="showPanel = false">
          <i class="el-dialog__close el-icon el-icon-close" />
        </button>
      </div>
      <div class="card-body scrollbar">
        <job-step-inspector :step-inputs="inspectedInputs" :relative-path-root="relativePathRoot" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from 'nuxt-property-decorator'
import InspectorMixins from '@/pages/_components/Graph/components/InspectorMixins'
import JobStepInspector from '@/pages/_components/Graph/components/JobStepInspector.vue'
import { StepModel, WorkflowModel } from 'cwlts/models'
import { AppHelper } from '@/pages/_components/Graph/helpers/AppHelper'
import { SVG_TYPE } from '@/pages/_components/Graph/plugins/plugin-help'

@Component({
  components: { JobStepInspector },
})
export default class EditorJobInspector extends InspectorMixins {
  @InjectReactive('model')
  model!: WorkflowModel

  inspectedInputs: any = []
  pipeId = ''

  get relativePathRoot() {
    return AppHelper.isLocal(this.pipeId) ? AppHelper.getDirname(this.pipeId) : undefined
  }

  onDblClickType: SVG_TYPE = 'node'
  onDblClick(element: SVGElement): void {
    let typeOfNode = 'steps'
    if (element.classList.contains('input')) {
      typeOfNode = 'inputs'
    } else if (element.classList.contains('output')) {
      typeOfNode = 'outputs'
    }
    this.selectionNode = (this.graph.model as any)[typeOfNode].find((input: any) => input.id === element.getAttribute('data-id'))
    switch (typeOfNode) {
      case 'inputs':
        this.inspectedInputs = [this.selectionNode]
        break
      case 'outputs':
        this.inspectedInputs = []
        break
      default:
        this.inspectedInputs = (this.selectionNode as StepModel).in.filter((n) => n.status === 'exposed')
        break
    }
    this.showPanel = true
  }
}
</script>
