<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CaseContent, CaseModel } from '@/types/model/Case'
import { responseError } from '@/types/response'

@Component
export default class CaseItemMixin extends Vue {
  error: responseError | null = null
  // TODO 优化成父子级数据结构，使用 @Inject 和 @Provide，减少 $store 的依赖
  get item(): CaseModel {
    return this.$store.state.case
  }
  get content(): CaseContent {
    return this.$store.getters['case/content']
  }
  mounted(): void {
    if (this.error?.msg) {
      this.$message.error(this.error.msg)
    }
  }
}
</script>
