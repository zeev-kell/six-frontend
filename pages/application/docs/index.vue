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
          <can-create>
            <nuxt-link v-slot="{ navigate }" :to="localePath('application-doc-new')" custom>
              <el-button type="primary" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 新建 </el-button>
            </nuxt-link>
          </can-create>
        </div>
      </div>
      <div class="table-box">
        <el-table ref="multipleTable" :data="tableData" class="w-100">
          <el-table-column label="名称" prop="name" sortable width="280">
            <template slot-scope="{ row }">
              <nuxt-link v-slot="{ href }" :to="localePath('/doc/' + row['id'])" custom>
                <a target="_blank" class="pointer" :href="href">
                  <i class="el-icon-search"></i>
                </a>
              </nuxt-link>
              <nuxt-link class="text-truncate" :to="localePath('/application/doc/' + row['id'])" :title="row.name">
                {{ row.title }}
              </nuxt-link>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CanCreate from '@/components/common/CanCreate.vue'
import intercept from '@/filters/intercept'
import { blogConstants } from '@/constants/BlogConstants'

@Component({
  components: { CanCreate },
  filters: {
    ...intercept,
    blogTypeTranslate: blogConstants.get,
  },
  async asyncData({ app }) {
    const items = await app.$api.blog.getList()
    return { items }
  },
})
export default class DocList extends Vue {
  query = {
    name: this.$route.query.name || '',
    category: this.$route.query.category || '',
    type: this.$route.query.type ? Number(this.$route.query.type) : '',
  }
  items = []
  typeList = blogConstants.getItemsList('TYPE_')

  get categoryList() {
    return this.items.reduce((list: any, item: any) => {
      item.category.forEach((category: any) => {
        if (!list.includes(category.name)) {
          list.push(category.name)
        }
      })
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
        return item.category.findIndex((c: any) => c.name === this.query.category) !== -1
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

  createFilter(str: string) {
    return (name: any) => {
      return name.value.toLowerCase().includes(str.toLowerCase())
    }
  }
  queryName(str: string, cb: any) {
    const nameList = this.nameList
    const results = str ? nameList.filter(this.createFilter(str)) : nameList
    cb(results)
  }
}
</script>
