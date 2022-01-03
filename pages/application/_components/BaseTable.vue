<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { ElTable } from 'element-ui/types/table'

@Component
export default class BaseTable extends Vue {
  $refs!: {
    multipleTable: ElTable
  }
  watchRefresh = true
  items: any[] = []
  multipleSelection: any[] = []
  query = {
    name: this.$route.query.name || '',
  }

  get nameList() {
    return this.items.reduce((list: any, item: any) => {
      if (!list.includes(item.name)) {
        list.push({ value: item.name })
      }
      return list
    }, [])
  }
  get tableData() {
    let data = this.items
    if (this.query.name !== '') {
      data = data.filter((item: any) => {
        return item.name.includes(this.query.name)
      })
    }
    return data
  }
  get hasSelected(): boolean {
    return this.multipleSelection.length > 0
  }

  async refresh(): Promise<void> {
    this.items = await this.$api.pipe.getList()
  }
  createFilter(str: string) {
    return (name: any) => {
      return name.value.toLowerCase().includes(str.toLowerCase())
    }
  }
  queryName(str: string, cb: any): void {
    const nameList = this.nameList
    const results = str ? nameList.filter(this.createFilter(str)) : nameList
    cb(results)
  }
  handleSelectionChange(selection: []): void {
    this.multipleSelection = selection
  }
  mounted(): void {
    if (this.watchRefresh) {
      this.$watch('$store.state.system.tableTime', this.refresh)
    }
  }
}
</script>
