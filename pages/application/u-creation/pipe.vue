<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import PipeListPage from '@/pages/application/pipes/index.vue'
import { Context } from '@nuxt/types'
import { TableMixinsHelper } from '@/pages/application/_components/Table/TableMixins'

@Component({
  async asyncData({ app, query, store }: Context): Promise<any> {
    const term = TableMixinsHelper.getTermObj(query.term)
    const otherQuery = {
      keywords: term.keywords || '',
      tag: term.tag || '',
      type: term.type ? Number(term.type) : '',
    }
    const listQuery = TableMixinsHelper.getPageSize(query)
    const fixedQuery = { provider: store.getters['user/username'] }
    listQuery.term = TableMixinsHelper.getTermStr(Object.assign({}, otherQuery, fixedQuery), ([key, value]: any) => {
      if (key === 'keywords') {
        return `name:${value} OR description:${value}`
      }
      return `${key}:${value}`
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
