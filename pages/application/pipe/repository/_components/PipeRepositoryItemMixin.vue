<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { PipeRepositoryModel } from '@/types/model/Pipe'

@Component
export default class PipeItemMixin extends Vue {
  // TODO 优化成父子级数据结构，使用 @Inject 和 @Provide，减少 $store 的依赖
  get item(): PipeRepositoryModel {
    return this.$store.state.pipeRepository
  }
}
</script>
