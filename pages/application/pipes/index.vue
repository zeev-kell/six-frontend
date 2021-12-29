<template>
  <layout-box class="py-10">
    <div slot="header" class="el-row--flex is-justify-space-between">
      <div class="search-box">
        <el-form class="form-inline" :inline="true" size="small" :model="otherQuery" @submit.native.prevent="searchQuery">
          <el-form-item>
            <el-input v-model="otherQuery.keywords" placeholder="按关键字筛选" clearable @keyup.enter.native="searchQuery"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="otherQuery.type" placeholder="按类别筛选" clearable @change="searchQuery">
              <el-option v-for="item in typeList" :key="item.value" :label="$t('constant.' + item.label)" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <category-select v-model="otherQuery.tag" type="pipe" placeholder="按分类筛选" @change="searchQuery"></category-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-refresh" class="el-button--icon" native-type="button" @click="resetQuery"></el-button>
            <el-button type="primary" icon="el-icon-search" class="el-button--icon" native-type="button" @click="searchQuery"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="action-box">
        <nuxt-link v-slot="{ navigate }" :to="localePath('application-pipe-new')" custom>
          <el-button type="primary" size="small" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
        </nuxt-link>
        <nuxt-link v-slot="{ navigate }" :to="localePath('graph-info-new')" custom>
          <el-button type="default" size="small" role="link" icon="el-icon-share" @click="navigate" @keypress.enter="navigate"> 流程组合 </el-button>
        </nuxt-link>
      </div>
    </div>
    <el-table ref="multipleTable" :data="tableData" class="w-100" height="200px">
      <el-table-column label="名称" prop="name" sortable width="280">
        <template slot-scope="{ row }">
          <div class="el-row--flex is-align-middle">
            <el-tooltip class="item" effect="dark" content="查看可视化" placement="top-start">
              <nuxt-link v-slot="{ href }" :to="localePath('/graph-info/' + row['resource_id'])" custom>
                <a target="_blank" class="pointer mr-5" :href="href">
                  <i class="el-icon-search"></i>
                </a>
              </nuxt-link>
            </el-tooltip>
            <nuxt-link
              v-if="row['resource_id'] != null"
              class="text-truncate"
              :to="localePath('/application/pipe/' + row['resource_id'])"
              :title="row.name"
            >
              {{ row.provider + '/' + row.name }}
            </nuxt-link>
            <nuxt-link v-else class="text-truncate" :to="localePath('/application/pipe/repository/' + row['pipe_id'])" :title="row.name">
              {{ row.provider + '/' + row.name }}
            </nuxt-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="应用类型" prop="type" sortable width="120">
        <template slot-scope="{ row }">
          {{ row.type | pipeTypeTranslate | t({ prefix: 'constant.' }) }}
        </template>
      </el-table-column>
      <el-table-column label="分类标签" prop="category" width="120">
        <template slot-scope="{ row }">
          <category-view :category="row.category" />
        </template>
      </el-table-column>
      <el-table-column label="最近版本" prop="latest_rev" width="120" />
      <el-table-column label="应用描述" prop="description">
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
import { PipeRepositoryModel } from '@/types/model/Pipe'
import { pipeConstants } from '@/constants/PipeConstants'
import CanCreate from '@/components/common/CanCreate.vue'
import intercept from '@/filters/intercept'
import LayoutBox from '@/pages/_components/LayoutBox.vue'
import TableMixins, { TableMixinsHelper } from '@/pages/application/_components/Table/TableMixins'
import TablePagination from '@/pages/application/_components/Table/TablePagination.vue'
import { Context } from '@nuxt/types'
import CategorySelect from '@/pages/application/_components/CategorySelect.vue'
import CategoryView from '@/pages/application/_components/CategoryView.vue'

@Component({
  components: { CategoryView, CategorySelect, TablePagination, LayoutBox, CanCreate },
  filters: {
    ...intercept,
    pipeTypeTranslate: pipeConstants.get,
  },
  async asyncData({ app, query }: Context): Promise<any> {
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
    const { count, data } = await app.$api.pipe.search(listQuery)
    return {
      otherQuery,
      listQuery,
      count,
      tableData: data,
    }
  },
})
export default class PipeListPage extends TableMixins<PipeRepositoryModel> {
  protected otherQuery!: {
    keywords: string
    tag: string
    type: number
  }
  typeList = pipeConstants.getItemsList('TYPE_')
}
</script>
