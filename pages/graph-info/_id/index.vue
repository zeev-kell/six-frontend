<template>
  <graph-index class="h-100v" :item="item" :readonly="true" tools="run|plus,minus,fit|auto" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'

@Component({
  components: { GraphIndex },
  async asyncData({ app, params }) {
    const item = await app.$axios.$get(`/v2/pipe/${params.id}`)
    return { item }
  },
})
export default class IndexPage extends Vue {
  item = null
}
</script>
