<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PipeModel } from '@/types/model/Pipe'

@Component
export default class PipeItemMixin extends Vue {
  get item(): PipeModel {
    return this.$store.state.pipe
  }
}
</script>
