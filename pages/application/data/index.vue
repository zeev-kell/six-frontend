<template>
  <div class="container-fluid p-20">
    <div class="card card-body">
      <div class="el-row--flex is-justify-space-between pb-10">
        <div class="search-box">
          <el-form class="form-inline" :inline="true" :model="query" @submit.native.prevent="">
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
                <el-option v-for="item in typeList" :key="item.value" :label="$t(item.label)" :value="item.value" />
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
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-datum-new')" custom>
            <el-button type="primary" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
          </nuxt-link>
        </div>
      </div>
      <div class="table-box">
        <el-table ref="multipleTable" :data="tableDate" style="width: 100%">
          <el-table-column label="名称" prop="name" sortable width="280">
            <template slot-scope="{ row }">
              <div class="el-row--flex is-align-middle">
                <nuxt-link class="text-truncate" :to="localePath('/application/datum/' + row['data_id'])" :title="row.name">
                  {{ row.provider + '/' + row.name }}
                </nuxt-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="类别" prop="type" sortable width="120">
            <template slot-scope="{ row }">
              {{ row.type | dateTypeTranslate | t }}
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseTable from '@/pages/application/_components/BaseTable.vue'
import { datumConstants } from '@/constants/DatumConstants'
import intercept from '@/filters/intercept'

@Component({
  async asyncData({ app }) {
    const items = await app.$api.datum.getList()
    return { items }
  },
  filters: {
    ...intercept,
    dateTypeTranslate: datumConstants.get,
  },
})
export default class IndexPage extends BaseTable {
  typeList = datumConstants.getItemsList('TYPE_')
}
</script>
