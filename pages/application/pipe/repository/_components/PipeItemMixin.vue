<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PipeRepositoryModel } from '@/types/model/Pipe'

@Component
export default class PipeItemMixin extends Vue {
  get item(): PipeRepositoryModel {
    return this.$store.state.pipeRepository
  }
}
</script>
