<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Repository } from '@/types/model/Pipe'

@Component
export default class PipeItemMixin extends Vue {
  get item(): Repository {
    return this.$store.state.pipeRepository
  }
}
</script>
