<template>
  <layout-box class="py-10">
    <div slot="header" class="el-row--flex is-justify-space-between">
      <div class="search-box">
        <el-form class="form-inline" :inline="true" :model="otherQuery" @submit.native.prevent="searchQuery">
          <el-form-item>
            <el-input v-model="otherQuery.name" placeholder="按关键字筛选" clearable @keyup.enter.native="searchQuery"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="otherQuery.type" placeholder="按类别筛选" clearable @change="searchQuery">
              <el-option v-for="item in typeList" :key="item.value" :label="$t(item.label)" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="otherQuery.category" placeholder="按类型筛选" clearable @change="searchQuery">
              <el-option v-for="item in categoryList" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" class="el-button--icon" native-type="button" @click="searchQuery"></el-button>
            <el-button type="primary" icon="el-icon-refresh" class="ml-10 el-button--icon" native-type="button" @click="resetQuery"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="action-box">
        <nuxt-link v-slot="{ navigate }" :to="localePath('application-pipe-new')" custom>
          <el-button type="primary" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
        </nuxt-link>
        <nuxt-link v-slot="{ navigate }" :to="localePath('graph-info-new')" custom>
          <el-button type="default" role="link" icon="el-icon-share" @click="navigate" @keypress.enter="navigate"> 流程组合 </el-button>
        </nuxt-link>
      </div>
    </div>
    <el-table ref="multipleTable" :data="tableData" style="width: 100%" height="100px" :loading="loading">
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
          {{ row.type | pipeTypeTranslate | t }}
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="category" sortable width="120" />
      <el-table-column label="最近版本" prop="version" width="120" />
      <el-table-column label="介绍" prop="description">
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
import { PipeModel } from '@/types/model/Pipe'
import { pipeConstants } from '@/constants/PipeConstants'
import CanCreate from '@/components/common/CanCreate.vue'
import intercept from '@/filters/intercept'
import LayoutBox from '@/pages/_components/LayoutBox.vue'
import TableMixins, { TableMixinsHelper } from '@/pages/_components/Table/TableMixins'
import TablePagination from '@/pages/_components/Table/TablePagination.vue'

@Component({
  components: { TablePagination, LayoutBox, CanCreate },
  filters: {
    ...intercept,
    pipeTypeTranslate: pipeConstants.get,
  },
  async asyncData({ app, query }): Promise<any> {
    const term = TableMixinsHelper.exportTerm(query.term)
    const otherQuery = {
      name: term.name || '',
      category: term.category || '',
      type: term.type ? Number(term.type) : '',
    }
    const listQuery = {
      page: Number(query.page) || 1,
      size: Number(query.size) || 20,
      term: TableMixinsHelper.getTerm(otherQuery),
    }
    const { count, data } = await app.$api.pipe.search(listQuery)
    return {
      otherQuery,
      listQuery,
      count,
      tableData: data,
    }
  },
})
export default class IndexPage extends TableMixins<PipeModel> {
  protected otherQuery!: {
    name: string
    category: string
    type: number
  }
  typeList = pipeConstants.getItemsList('TYPE_')
  categoryList = []
}
</script>
