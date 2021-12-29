<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { CaseContent, CaseModel } from '@/types/model/Case'
import { responseError } from '@/types/response'

@Component
export default class CaseItemMixin extends Vue {
  error: responseError | null = null
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
