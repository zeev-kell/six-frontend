<template>
  <cwl-graph class="h-100v" :item="item" :readonly="true" tools="run|plus,minus,fit|auto" />
</template>

<script type="text/babel">
  import CwlGraph from '@/pages/application/_components/cwl-graph/CwlGraph'
  export default {
    components: { CwlGraph },
    async asyncData({ app, params }) {
      const item = await app.$axios.$get(`/pipe?pipe_id=${params.id}`)
      return { item }
    },
    data() {
      return {
        item: undefined,
      }
    },
  }
</script>
