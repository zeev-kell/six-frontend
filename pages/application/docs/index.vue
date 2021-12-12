<template>
  <layout-box class="py-10">
    <div slot="header" class="el-row--flex is-justify-space-between">
      <div class="search-box">
        <el-form class="form-inline" :inline="true" :model="otherQuery" @submit.native.prevent="searchQuery">
          <el-form-item>
            <el-input v-model="otherQuery.title" placeholder="按关键字筛选" clearable @keyup.enter.native="searchQuery"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="otherQuery.type" placeholder="按类别筛选" clearable @change="searchQuery">
              <el-option v-for="item in typeList" :key="item.value" :label="$t('constant.' + item.label)" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="otherQuery.category" placeholder="按分类筛选" clearable @change="searchQuery">
              <el-option v-for="item in categoryList" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-refresh" class="ml-10 el-button--icon" native-type="button" @click="resetQuery"></el-button>
            <el-button type="primary" icon="el-icon-search" class="el-button--icon" native-type="button" @click="searchQuery"></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="action-box">
        <can-create>
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-doc-new')" custom>
            <el-button type="primary" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
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
        <template slot-scope="{ row }">{{ row.category.map((c) => c.name).join(' ') }}</template>
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
import TableMixins, { TableMixinsHelper } from '@/pages/_components/Table/TableMixins'
import TablePagination from '@/pages/_components/Table/TablePagination.vue'

@Component({
  components: { TablePagination, LayoutBox, CanCreate },
  filters: {
    ...intercept,
    blogTypeTranslate: blogConstants.get,
  },
  async asyncData({ app, query }): Promise<any> {
    const term = TableMixinsHelper.exportTerm(query.term)
    const otherQuery = {
      title: term.title || '',
      category: term.category || '',
      type: term.type ? Number(term.type) : '',
    }
    const listQuery = TableMixinsHelper.initListQuery(query, otherQuery)
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
    title: string
    category: string
    type: number
  }
  typeList = blogConstants.getItemsList('TYPE_')
  categoryList = []
}
</script>
