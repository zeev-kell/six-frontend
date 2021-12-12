<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import DocListPage from '@/pages/application/docs/index.vue'
import { TableMixinsHelper } from '@/pages/_components/Table/TableMixins'
import { Context } from '@nuxt/types'

@Component({
  async asyncData({ app, query, store }: Context): Promise<any> {
    const term = TableMixinsHelper.exportTerm(query.term)
    const otherQuery = {
      title: term.title || '',
      category: term.category || '',
      type: term.type ? Number(term.type) : '',
    }
    const listQuery = TableMixinsHelper.initListQuery(query, otherQuery, {
      provider: store.getters['user/username'],
    })
    const { count, data } = await app.$api.blog.search(listQuery)
    return {
      otherQuery,
      listQuery,
      count,
      tableData: data,
    }
  },
})
export default class DocsPage extends DocListPage {}
</script>
