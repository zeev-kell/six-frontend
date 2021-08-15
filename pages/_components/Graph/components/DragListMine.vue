<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { tableQuery } from '@/types/table'
import { PipeModel } from '@/types/model/Pipe'
import { pipe2Constants } from '@/constants/Pipe2Constants'
import DragListShop from '@/pages/_components/Graph/components/DragListShop.vue'

@Component
export default class DragListMine extends DragListShop {
  protected listQuery: tableQuery = {
    page: 1,
    size: 10000,
    name: undefined,
    status: pipe2Constants.items.STATUS_ON,
  }

  async refreshTable(): Promise<void> {
    let response = await this.$api.pipe.getListV2()
    response = response.filter((r: PipeModel) => r.type === 0 || r.type === 1)
    response.forEach((t: PipeModel) => {
      // 为每个数据增加 _loading 属性
      Object.defineProperty(t, '_expanded', {
        value: false,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    })
    this.tableData = response
  }
}
</script>
