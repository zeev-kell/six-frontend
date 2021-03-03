<template>
  <div v-if="showPanel" class="cwl-run-panel">1111111111111111111</div>
</template>

<script type="text/babel">
  import CwlPanel from '@/pages/application/_components/cwl-graph/CwlPanel'

  export default {
    name: 'CwlRunPanel',
    mixins: [CwlPanel],
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
</style>
