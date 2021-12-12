import { Component, Vue } from 'vue-property-decorator'
import { tableQuery } from '@/types/table'
import { ElTable } from 'element-ui/types/table'
import { Route } from 'vue-router'

@Component({
  watchQuery: ['page', 'size', 'term'],
})
export default class TableMixins<T> extends Vue {
  $refs!: {
    multipleTable: ElTable
  }
  // 查询参数
  protected listQuery: tableQuery = {
    page: 1,
    size: 20,
    term: '',
  }
  // 其他附加参数
  protected otherQuery: { [index: string]: string | number | undefined } = {}
  protected tableData: T[] = []
  protected count = 0
  async resetQuery(): Promise<void> {
    // 刷新需要重置查询条件
    Object.keys(this.otherQuery).forEach((k) => (this.otherQuery[k] = ''))
    await this.searchQuery()
  }
  async searchQuery(): Promise<void> {
    // 查询需要重置页数
    this.listQuery.page = 1
    await this.refreshTable()
  }
  async refreshTable(): Promise<void> {
    // 分页可以直接查询
    this.listQuery.term = TableMixinsHelper.getTerm(this.otherQuery)
    await this.$I18nRouter.push({
      query: this.listQuery as any,
    })
  }
}

export class TableMixinsHelper {
  static getTerm(obj: any): string {
    return Object.entries(obj as { [index: string]: string })
      .filter(([key, value]) => value !== '' && value !== undefined)
      .map(([key, value]) => `${key}:${value}`)
      .join(' AND ')
  }
  static exportTerm(str: any): any {
    return decodeURIComponent(str)
      .split(' AND ')
      .map((s) => s.split(':'))
      .reduce((obj: any, [key, value]) => {
        obj[key] = value
        return obj
      }, {})
  }
  static initListQuery(query: Route['query'], otherQuery: any, fixedQuery: any = {}) {
    return {
      page: Number(query.page) || 1,
      size: Number(query.size) || 20,
      term: TableMixinsHelper.getTerm(Object.assign({}, otherQuery, fixedQuery)),
    }
  }
}
