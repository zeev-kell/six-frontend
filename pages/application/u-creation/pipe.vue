<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import PipeListPage from '@/pages/application/pipes/index.vue'
import { Context } from '@nuxt/types'
import { TableMixinsHelper } from '@/pages/_components/Table/TableMixins'

@Component({
  async asyncData({ app, query, store }: Context): Promise<any> {
    const term = TableMixinsHelper.exportTerm(query.term)
    const otherQuery = {
      name: term.name || '',
      category: term.category || '',
      type: term.type ? Number(term.type) : '',
    }
    const listQuery = TableMixinsHelper.initListQuery(query, otherQuery, {
      provider: store.getters['user/username'],
    })
    const { count, data } = await app.$api.pipe.search(listQuery)
    return {
      otherQuery,
      listQuery,
      count,
      tableData: data,
    }
  },
})
export default class PipePage extends PipeListPage {}
</script>
