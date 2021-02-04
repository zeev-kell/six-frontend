<template>
  <div class="h-100v">
    <workflow-box ref="cwl" :cwl="item.cwl_json"></workflow-box>
  </div>
</template>

<script type="text/babel">
  import WorkflowBox from '@/pages/application/_components/WorkflowBox'
  import { SVGArrangePlugin } from 'cwl-svg'
  export default {
    name: 'GraphInfo',
    components: { WorkflowBox },
    async asyncData({ app, params }) {
      const item = await app.$axios.$get(`/workflow/${params.id}`)
      return { item }
    },
    data() {
      return {
        item: undefined,
      }
    },
    computed: {
      workflow() {
        return this.$refs.cwl.workflow
      },
    },
    mounted() {
      window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
    },
    methods: {
      onResize() {
        this.workflow.getPlugin(SVGArrangePlugin).arrange()
      },
    },
  }
</script>
