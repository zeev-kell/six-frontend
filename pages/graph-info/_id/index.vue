<template>
  <cwl-graph class="h-100v" :item="item" :readonly="true" />
</template>

<script type="text/babel">
  import CwlGraph from '@/pages/application/_components/cwl-graph'
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
