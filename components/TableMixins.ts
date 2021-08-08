import { Component, Vue } from 'vue-property-decorator'
import { tableQuery, tableResponse } from '@/types/table'

@Component
export default class TableMixins<T> extends Vue {
  // 查询参数
  protected listQuery: tableQuery = {
    page: 1,
    size: 20,
    name: undefined,
  }
  // 其他附加参数
  protected otherQuery = {}
  protected tableData: T[] = []
  protected loading = false
  protected total = 0
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTableData(listQuery: tableQuery): Promise<tableResponse<T> | any> {
    throw new Error('Method not implemented.')
  }
  async resetQuery(): Promise<void> {
    // 刷新需要重置查询条件
    this.listQuery.name = undefined
    await this.searchQuery()
  }
  async searchQuery(): Promise<void> {
    // 查询需要重置页数
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
  created(): Promise<void> {
    return this.refreshTable()
  }
}
