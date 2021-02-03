<template>
  <div class="h-100v">
    <workflow-cwl ref="cwl" :cwl="item.cwl_json"></workflow-cwl>
  </div>
</template>

<script type="text/babel">
  import WorkflowCwl from '@/pages/application/workflow/_components/WorkflowCwl'
  import { SVGArrangePlugin } from 'cwl-svg'
  export default {
    name: 'GraphInfo',
    components: { WorkflowCwl },
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
