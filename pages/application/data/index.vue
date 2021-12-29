<template>
  <layout-box class="py-10">
    <div slot="header" class="el-row--flex is-justify-space-between">
      <div class="search-box">
        <el-form class="form-inline" :inline="true" :model="otherQuery" size="small" @submit.native.prevent="">
          <el-form-item>
            <el-input v-model="otherQuery.keywords" placeholder="按关键字筛选" clearable @keyup.enter.native="searchQuery"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="otherQuery.type" placeholder="按类别筛选" clearable>
              <el-option v-for="item in typeList" :key="item.value" :label="$t('constant.' + item.label)" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <category-select v-model="otherQuery.tag" type="data" @change="searchQuery"></category-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="el-button--icon" native-type="button" icon="el-icon-refresh" @click="resetQuery"></el-button>
            <el-button type="primary" class="el-button--icon" native-type="button" icon="el-icon-search" @click="searchQuery"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="action-box">
        <can-create>
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-datum-new')" custom>
            <el-button type="primary" size="small" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
          </nuxt-link>
        </can-create>
      </div>
    </div>
    <el-table ref="multipleTable" :data="tableData" class="w-100" height="200px">
      <el-table-column label="名称" prop="name" sortable width="280">
        <template slot-scope="{ row }">
          <div class="el-row--flex is-align-middle">
            <nuxt-link class="text-truncate" :to="localePath('/application/datum/' + row['resource_id'])" :title="row.name">
              {{ row.provider + '/' + row.name }}
            </nuxt-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类别" prop="type" sortable width="120">
        <template slot-scope="{ row }">
          {{ row.type | dateTypeTranslate | t({ prefix: 'constant.' }) }}
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="category" width="150">
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
    <div slot="footer" class="pt-10">
      <table-pagination :total="count" :list-query.sync="listQuery" @size-change="searchQuery" @current-change="refreshTable" />
    </div>
  </layout-box>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { datumConstants } from '@/constants/DatumConstants'
import intercept from '@/filters/intercept'
import LayoutBox from '@/pages/_components/LayoutBox.vue'
import TableMixins, { TableMixinsHelper } from '@/pages/application/_components/Table/TableMixins'
import { BlogModel } from '@/types/model/Blog'
import TablePagination from '@/pages/application/_components/Table/TablePagination.vue'
import CategorySelect from '@/pages/application/_components/CategorySelect.vue'
import CategoryView from '@/pages/application/_components/CategoryView.vue'

@Component({
  components: { CategoryView, CategorySelect, TablePagination, LayoutBox },
  filters: {
    ...intercept,
    dateTypeTranslate: datumConstants.get,
  },
  async asyncData({ app, query }) {
    const term = TableMixinsHelper.getTermObj(query.term)
    const otherQuery = {
      keywords: term.keywords || '',
      tag: term.tag || '',
      type: term.type ? Number(term.type) : '',
    }
    const listQuery = TableMixinsHelper.getPageSize(query)
    listQuery.term = TableMixinsHelper.getTermStr(otherQuery, ([key, value]: any) => {
      if (key === 'keywords') {
        return `name:${value} OR description:${value}`
      }
      return `${key}:${value}`
    })
    const { count, data } = await app.$api.datum.search(listQuery)
    return {
      otherQuery,
      listQuery,
      count,
      tableData: data,
    }
  },
})
export default class IndexPage extends TableMixins<BlogModel> {
  protected otherQuery!: {
    keywords: string
    tag: string
    type: number
  }
  typeList = datumConstants.getItemsList('TYPE_')
}
</script>
