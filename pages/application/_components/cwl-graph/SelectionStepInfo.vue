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
      <label>Description{{ description ? '' : ':' }}</label>
      <div class="el-form-item">
        <div v-marked="description"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import marked from '@/directives/marked'
  import { AppHelper } from '@/pages/application/_components/cwl-graph/helps/AppHelper'

  export default {
    name: 'SelectionStepInfo',
    directives: {
      ...marked,
    },
    props: {
      step: {
        type: Object,
        default: null,
      },
    },
    computed: {
      description() {
        return this.step.description || this.step.run ? this.step.run.description : ''
      },
      source() {
        const rdfID = this.step.customProps['sbg:rdfId']
        if (rdfID) {
          return AppHelper.getDirname(rdfID)
        }
        return this.step.run.customProps['sbg:project'] || 'Embedded'
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  @import '_theme';
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
