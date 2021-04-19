<template>
  <graph-index class="h-100v" :item="item" :readonly="true" tools="run|plus,minus,fit|auto" />
</template>

<script type="text/babel">
  import GraphIndex from '@/pages/application/_components/graph/GraphIndex'
  export default {
    components: { GraphIndex },
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
