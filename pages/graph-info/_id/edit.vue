<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import GraphInfoNew from '../new.vue'

@Component({
  async asyncData({ app, params }) {
    const item = await app.$axios.$get(`/v2/pipe/${params.id}`)
    return { item }
  },
})
export default class GraphInfoEditPage extends GraphInfoNew {
  item = null
}
</script>
