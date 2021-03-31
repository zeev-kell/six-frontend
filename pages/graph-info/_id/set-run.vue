<template>
  <cwl-graph class="h-100v" :item="item" :readonly="false" config-type="run" tools="download|plus,minus,fit" />
</template>

<script type="text/babel">
  import CwlGraph from '@/pages/application/_components/cwl-graph/CwlGraph'
  export default {
    components: { CwlGraph },
    async asyncData({ app, params }) {
      const item = await app.$axios.$get(`/pipe/${params.id}`)
      return { item }
    },
    data() {
      return {
        item: undefined,
      }
    },
  }
</script>
