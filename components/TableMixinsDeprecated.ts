import { Component, Vue } from 'nuxt-property-decorator'
import { tableQuery, tableResponse } from '@/types/response'

@Component
export default class TableMixinsDeprecated<T> extends Vue {
  // 查询参数
  protected listQuery: any = {
    page: 1,
    size: 20,
    name: undefined,
  }
  // 其他附加参数
  protected otherQuery = {}
  protected tableData: T[] = []
  protected loading = false
  protected total = 0
  protected immediate = false
  protected listQueryKeys: string[] = []
  getTableData(listQuery: tableQuery): Promise<tableResponse<T> | any> {
    throw new Error('Method not implemented.')
  }
  async searchQuery(): Promise<void> {
    // 查询需要重置页数
    this.listQueryKeys.forEach((k: string) => {
      // 过滤无效的搜索条件
      if (this.listQuery[k] === '') {
        this.listQuery[k] = undefined
      }
    })
    this.listQuery.page = 1
    await this.refreshTable()
  }
  async refreshTable(): Promise<void> {
    this.loading = true
    const response = await this.getTableData(Object.assign(this.listQuery, this.otherQuery))
    this.loading = false
    if (response === undefined) {
      return
    }
    const {
      data: { count, rows },
    } = response
    this.total = count
    this.tableData = <T[]>rows.map((r: T) => {
      // 为每个数据增加 _loading 属性
      Object.defineProperty(r, '_loading', {
        value: false,
        enumerable: true,
        configurable: true,
        writable: true,
      })
      return r
    })
    this.loading = false
  }
  created(): Promise<void> | undefined {
    if (this.immediate) {
      return this.refreshTable()
    }
  }
}
