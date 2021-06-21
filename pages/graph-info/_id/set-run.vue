<template>
  <graph-index class="h-100v" :item="item" config-type="run" tools="download|plus,minus,fit" />
</template>

<script type="text/babel">
  import GraphIndex from '@/pages/application/_components/graph/GraphIndex'
  export default {
    components: { GraphIndex },
    async asyncData({ app, params }) {
      const item = await app.$axios.$get(`/v1/pipe/${params.id}`)
      return { item }
    },
    data() {
      return {
        item: undefined,
      }
    },
  }
</script>
