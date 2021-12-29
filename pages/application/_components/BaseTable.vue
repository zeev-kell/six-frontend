<template>
  <div class="container-fluid p-20">
    <div class="card card-body">
      <div class="el-row--flex is-justify-space-between pb-10">
        <div class="search-box">
          <el-form class="form-inline" :inline="true" size="small" :model="query" @submit.native.prevent="">
            <el-form-item>
              <el-autocomplete v-model="query.name" :fetch-suggestions="queryName" placeholder="按名字筛选">
                <template slot-scope="{ item }">
                  <div class="name">
                    {{ item.value }}
                  </div>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.type" placeholder="按类别筛选" clearable>
                <el-option v-for="item in typeList" :key="item.value" :label="$t('constant.' + item.label)" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.category" placeholder="按类型筛选" clearable>
                <el-option v-for="item in categoryList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="action-box">
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-pipe-new')" custom>
            <el-button type="primary" size="small" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
          </nuxt-link>
          <nuxt-link v-slot="{ navigate }" :to="localePath('graph-info-new')" custom>
            <el-button type="default" size="small" role="link" icon="el-icon-share" @click="navigate" @keypress.enter="navigate">
              流程组合
            </el-button>
          </nuxt-link>
        </div>
      </div>
      <div class="table-box">
        <el-table ref="multipleTable" :data="tableData" style="width: 100%">
          <el-table-column label="名称" prop="name" sortable width="280">
            <template slot-scope="{ row }">
              <div class="el-row--flex is-align-middle">
                <el-tooltip class="item" effect="dark" content="查看可视化" placement="top-start">
                  <el-button type="text" icon="el-icon-search" class="px-5 py-0" @click.stop="showVisualModal(row['resource_id'])" />
                </el-tooltip>
                <nuxt-link class="text-truncate" :to="localePath('/application/pipe/' + row['resource_id'])" :title="row.name">
                  {{ row.provider + '/' + row.name }}
                </nuxt-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="类别" prop="type" sortable width="120">
            <template slot-scope="{ row }">
              {{ row.type | pipeTypeTranslate | t({ prefix: 'constant.' }) }}
            </template>
          </el-table-column>
          <el-table-column label="分类" prop="category" width="120">
            <template slot-scope="{ row }">
              <category-view :category="row.category" />
            </template>
          </el-table-column>
          <el-table-column label="最近版本" prop="version" width="120" />
          <el-table-column label="描述" prop="description">
            <template slot-scope="{ row }">
              {{ row.description | intercept }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CanCreate from '@/components/common/CanCreate.vue'
import intercept from '@/filters/intercept'
import { pipeConstants } from '@/constants/PipeConstants'
import { ElTable } from 'element-ui/types/table'
import CategoryView from '@/pages/application/_components/CategoryView.vue'

@Component({
  components: { CategoryView, CanCreate },
  filters: {
    ...intercept,
    pipeTypeTranslate: pipeConstants.get,
  },
  async asyncData({ app }) {
    const items = await app.$api.pipe.getList()
    return { items }
  },
})
export default class BaseTable extends Vue {
  $refs!: {
    multipleTable: ElTable
  }
  watchRefresh = true
  items: any[] = []
  multipleSelection: any[] = []
  query = {
    name: this.$route.query.name || '',
    category: this.$route.query.category || '',
    type: this.$route.query.type ? Number(this.$route.query.type) : '',
  }
  typeList = pipeConstants.getItemsList('TYPE_')

  get categoryList() {
    return this.items.reduce((list: any, item: any) => {
      if (!list.includes(item.category)) {
        list.push(item.category)
      }
      return list
    }, [])
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
    if (this.query.category !== '') {
      data = data.filter((item: any) => {
        return item.category === this.query.category
      })
    }
    if (this.query.name !== '') {
      data = data.filter((item: any) => {
        return item.name.includes(this.query.name)
      })
    }
    if (this.query.type !== '') {
      data = data.filter((item: any) => {
        return item.type === this.query.type
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
  showVisualModal(id: string): void {
    // window.open(`/graph-info/${id}`, '_blank', 'toolbar=0,location=0,menubar=0')
    window.open(`/graph-info/${id}`, '_blank')
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
