<template>
  <div class="workflow-step-inspector-info">
    <div>
      <label>{{ $t('common.type') }}:</label>{{ step.run['class'] }}
    </div>
    <div>
      <label>{{ $t('common.cwl_version') }}:</label> {{ step.run['cwlVersion'] }}
    </div>
    <div>
      <label>{{ $t('common.revision') }}:</label>{{ step.run.customProps['sbg:revision'] }}
    </div>
    <div>
      <label>{{ $t('common.toolkit') }}:</label>
      {{ step.run.customProps['sbg:toolkit'] }} {{ step.run.customProps['sbg:toolkitVersion'] }}
    </div>
    <div>
      <label>{{ $t('common.author') }}:</label>{{ step.run.customProps['sbg:createdBy'] }}
    </div>
    <div>
      <label>{{ $t('common.source') }}:</label>{{ source }}
    </div>
    <div>
      <label>{{ $t('graph.Description') }}{{ description ? '' : ':' }}</label>
      <div class="el-form-item">
        <div v-marked="description" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { StepModel } from 'cwlts/models'
import { AppHelper } from '@/pages/_components/Graph/helpers/AppHelper'
import marked from '@/directives/marked/marked'

@Component({
  directives: {
    ...marked,
  },
})
export default class WorkflowStepInspectorInfo extends Vue {
  @Prop({ required: true })
  step!: StepModel

  get description(): string | undefined {
    return this.step.description || this.step.run ? this.step.run.description : ''
  }
  get source(): string {
    const rdfID = this.step.customProps['sbg:rdfId']
    if (rdfID) {
      return AppHelper.getDirname(rdfID)
    }
    return this.step.run.customProps['sbg:project'] || 'Embedded'
  }
}
</script>
