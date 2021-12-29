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
            <category-select v-model="otherQuery.tag" type="blog" @change="searchQuery"></category-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-refresh" class="el-button--icon" native-type="button" @click="resetQuery"></el-button>
            <el-button type="primary" icon="el-icon-search" class="el-button--icon" native-type="button" @click="searchQuery"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="action-box">
        <can-create>
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-doc-new')" custom>
            <el-button type="primary" size="small" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
          </nuxt-link>
        </can-create>
      </div>
    </div>
    <el-table ref="multipleTable" :data="tableData" class="w-100" height="200px">
      <el-table-column label="名称" prop="name" sortable width="280">
        <template slot-scope="{ row }">
          <div class="el-row--flex is-align-middle">
            <el-tooltip class="item" effect="dark" content="查看可视化" placement="top-start">
              <nuxt-link v-slot="{ href }" :to="localePath('/doc/' + row['id'])" custom>
                <a target="_blank" class="pointer mr-5" :href="href">
                  <i class="el-icon-search"></i>
                </a>
              </nuxt-link>
            </el-tooltip>
            <nuxt-link class="text-truncate" :to="localePath('/application/doc/' + row['id'])" :title="row.name">
              {{ row.title }}
            </nuxt-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类别" prop="type" sortable width="120">
        <template slot-scope="{ row }">
          {{ row.type | blogTypeTranslate | t({ prefix: 'constant.' }) }}
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="category" width="150">
        <template slot-scope="{ row }">
          <category-view :category="row.category" />
        </template>
      </el-table-column>
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
import { BlogModel } from '@/types/model/Blog'
import { blogConstants } from '@/constants/BlogConstants'
import CanCreate from '@/components/common/CanCreate.vue'
import intercept from '@/filters/intercept'
import LayoutBox from '@/pages/_components/LayoutBox.vue'
import TableMixins, { TableMixinsHelper } from '@/pages/application/_components/Table/TableMixins'
import TablePagination from '@/pages/application/_components/Table/TablePagination.vue'
import CategorySelect from '@/pages/application/_components/CategorySelect.vue'
import CategoryView from '@/pages/application/_components/CategoryView.vue'

@Component({
  components: { CategoryView, CategorySelect, TablePagination, LayoutBox, CanCreate },
  filters: {
    ...intercept,
    blogTypeTranslate: blogConstants.get,
  },
  async asyncData({ app, query }): Promise<any> {
    const term = TableMixinsHelper.getTermObj(query.term)
    const otherQuery = {
      keywords: term.keywords || '',
      tag: term.tag || '',
      type: term.type ? Number(term.type) : '',
    }
    const listQuery = TableMixinsHelper.getPageSize(query)
    listQuery.term = TableMixinsHelper.getTermStr(otherQuery, ([key, value]: any) => {
      if (key === 'keywords') {
        return `title:${value} OR description:${value}`
      }
      return `${key}:${value}`
    })
    const { count, data } = await app.$api.blog.search(listQuery)
    return {
      otherQuery,
      listQuery,
      count,
      tableData: data,
    }
  },
})
export default class DocListPage extends TableMixins<BlogModel> {
  protected otherQuery!: {
    keywords: string
    tag: string
    type: number
  }
  typeList = blogConstants.getItemsList('TYPE_')
}
</script>
