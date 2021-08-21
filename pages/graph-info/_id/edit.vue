<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import GraphWorkflowEdit from '@/pages/_components/Graph/GraphWorkflowEdit.vue'

@Component({
  async asyncData({ app, params }) {
    const item = await app.$axios.$get(`/v2/pipe/${params.id}`)
    return { item }
  },
})
export default class GraphInfoEditPage extends GraphWorkflowEdit {
  item: any = null
}
</script>
