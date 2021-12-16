import { Component, Vue } from 'vue-property-decorator'
import { tableQuery } from '@/types/table'
import { ElTable } from 'element-ui/types/table'
import { Route } from 'vue-router'
import './TableMixins.scss'

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
  protected otherQuery: { [index: string]: string | number | undefined | any[] } = {}
  protected tableData: T[] = []
  protected count = 0
  async resetQuery(): Promise<void> {
    // 刷新需要重置查询条件
    Object.keys(this.otherQuery).forEach((k) => {
      if (Array.isArray(this.otherQuery)) {
        this.otherQuery[k] = []
      } else {
        this.otherQuery[k] = ''
      }
    })
    await this.searchQuery()
  }
  async searchQuery(): Promise<void> {
    // 查询需要重置页数
    this.listQuery.page = 1
    await this.refreshTable()
  }
  async refreshTable(): Promise<void> {
    // 分页可以直接查询
    this.listQuery.term = TableMixinsHelper.getUrlTermStr(this.otherQuery)
    await this.$I18nRouter.push({
      query: this.listQuery as any,
    })
  }
}

export class TableMixinsHelper {
  private readonly getTermStrMap: ([key, value]: any) => {}
  constructor(getTermStrMap: ([key, value]: any) => {}) {
    this.getTermStrMap = getTermStrMap
  }
  static getPageSize(query: Route['query']): any {
    return {
      page: Number(query.page) || 1,
      size: Number(query.size) || 20,
    }
  }
  static getTermObj(str: any): any {
    return decodeURIComponent(str)
      .split(/ (AND|OR) /)
      .map((s) => s.split(':'))
      .reduce((obj: any, [key, value]) => {
        obj[key] = value
        return obj
      }, {})
  }
  static getTermStr(obj: { [index: string]: any }, getTermStrMap: ([key, value]: any) => {}): any {
    return Object.entries(obj)
      .filter(([key, value]) => value !== undefined && value !== '' && value.length !== 0)
      .map(getTermStrMap)
      .join(' AND ')
  }
  static getUrlTermStr(obj: any): string {
    return Object.entries(obj as { [index: string]: string })
      .filter(([key, value]) => value !== undefined && value !== '' && value.length !== 0)
      .map(([key, value]) => `${key}:${value}`)
      .join(' AND ')
  }
  static exportTerm(str: any): any {
    return decodeURIComponent(str)
      .split(/ (AND|OR) /)
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
      term: TableMixinsHelper.getUrlTermStr(Object.assign({}, otherQuery, fixedQuery)),
    }
  }
}
