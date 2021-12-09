<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import DocListPage from '@/pages/application/docs/index.vue'
import { BlogModel } from '@/types/model/Blog'

@Component({
  async asyncData({ app }) {
    const items: BlogModel[] = await app.$api.user.getDocs()
    return { items }
  },
})
export default class DocsPage extends DocListPage {}
</script>
