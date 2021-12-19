<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { TableMixinsHelper } from '@/pages/_components/Table/TableMixins'
import { Context } from '@nuxt/types'
import CaseListPage from '@/pages/application/cases/index.vue'

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
        return `title:${value} OR description:${value}`
      }
      return `${key}:${value}`
    })
    const { count, data } = await app.$api.case.search(listQuery)
    return {
      otherQuery,
      listQuery,
      count,
      tableData: data,
    }
  },
})
export default class DocsPage extends CaseListPage {}
</script>
