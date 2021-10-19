<template>
  <div class="container-fluid p-20">
    <transition>
      <div>
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3" class="el-row el-row--flex is-align-middle text-center">
          <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
          或
          <el-input placeholder="链接">
            <el-button slot="append" icon="el-icon-check"></el-button>
          </el-input>
          <div slot="tip" class="el-upload__tip el-col-24">只能上传不超过2M的文件</div>
        </el-upload>
      </div>
    </transition>
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
        </el-form>
      </div>
      <div class="action-box">
        <nuxt-link v-slot="{ navigate }" :to="localePath('application-datum-id-file-new')" custom>
          <el-button type="primary" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 新增 </el-button>
        </nuxt-link>
      </div>
    </div>
    <div class="table-box">
      <el-table ref="multipleTable" :data="tableDate" style="width: 100%">
        <el-table-column label="文件名称" prop="name" sortable width="280">
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
        <el-table-column label="媒介类型" prop="type" sortable width="120">
          <template slot-scope="{ row }">
            {{ row.type | pipeTypeTranslate | t }}
          </template>
        </el-table-column>
        <el-table-column label="大小" prop="category" sortable width="120" />
        <el-table-column label="MD5校验码" prop="version" width="120" />
        <el-table-column label="格式规范" prop="version" width="120" />
        <el-table-column label="说明" prop="description">
          <template slot-scope="{ row }">
            {{ row.description | intercept }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import BaseTable from '@/pages/application/_components/BaseTable.vue'
import { yamlToJson } from '@/pages/_components/Graph/helpers/YamlHandle'

@Component({
  asyncData({ store }) {
    const datum = store.state.datum
    console.log(yamlToJson(datum.content))
    return { items: [] }
  },
})
export default class manage extends BaseTable {}
</script>
