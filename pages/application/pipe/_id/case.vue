<template>
  <div class="panel">
    <div class="panel-header el-row--flex is-align-middle">
      <h2 class="mx-0 el-col-equal">双击图标查看参数</h2>
    </div>
    <div class="panel-body">
      <div class="workflow-box">
        <graph-index class="h-100" :item="item" config-type="run" tools="download|plus,minus,fit" />
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import GraphIndex from '@/pages/application/_components/graph/GraphIndex'

export default {
  components: { GraphIndex },
  computed: {
    item() {
      return this.$store.state.pipe
    },
  },
}
</script>

<style lang="scss" scoped>
.workflow-box {
  min-height: 450px;
  height: calc(100vh - 60px);
}
</style>
