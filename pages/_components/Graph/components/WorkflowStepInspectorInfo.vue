<template>
  <div class="selection-step-info">
    <div><label>TYPE:</label>{{ step.run['class'] }}</div>
    <div><label>CWL VERSION:</label> {{ step.run['cwlVersion'] }}</div>
    <div><label>REVISION:</label>{{ step.run.customProps['sbg:revision'] }}</div>
    <div>
      <label>TOOLKIT:</label>
      {{ step.run.customProps['sbg:toolkit'] }} {{ step.run.customProps['sbg:toolkitVersion'] }}
    </div>
    <div><label>AUTHOR:</label>{{ step.run.customProps['sbg:createdBy'] }}</div>
    <div><label>SOURCE:</label>{{ source }}</div>
    <div>
      <label>{{ $t('cwl.Description') }}{{ description ? '' : ':' }}</label>
      <div class="el-form-item">
        <div v-marked="description" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
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
<style scoped lang="scss" rel="stylesheet">
@import '../../../application/_components/graph/theme';
.selection-step-info > div {
  margin-bottom: 10px;
  color: $color1;
  label {
    font-weight: bold;
    color: $color2;
    margin-right: 4px;
  }
}
</style>
