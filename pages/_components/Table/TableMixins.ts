import { Component, Vue } from 'vue-property-decorator'
import { tableQuery, tableResponse } from '@/types/table'
import { ElTable } from 'element-ui/types/table'

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
  }
  // 其他附加参数
  protected otherQuery: { [index: string]: string | number | undefined } = {}
  protected tableData: T[] = []
  protected loading = false
  protected count = 0
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTableData(listQuery: tableQuery): Promise<tableResponse<T> | any> {
    throw new Error('Method not implemented.')
  }
  async resetQuery(): Promise<void> {
    // 刷新需要重置查询条件
    Object.keys(this.otherQuery).forEach((k) => (this.otherQuery[k] = undefined))
    console.log(this.otherQuery)
    await this.searchQuery()
  }
  async searchQuery(): Promise<void> {
    // 查询需要重置页数
    this.listQuery.page = 1
    await this.refreshTable()
  }
  async refreshTable(): Promise<void> {
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
}
