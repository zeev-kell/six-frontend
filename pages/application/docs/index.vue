<template>
  <div class="container-fluid">
    <div class="card card-body">
      <div class="el-row--flex is-justify-space-between pb-10">
        <div class="search-box">
          <el-form class="form-inline" :inline="true" :model="query" @submit.native.prevent="">
            <el-form-item>
              <el-autocomplete v-model="query.name" :fetch-suggestions="queryName" placeholder="按名字筛选">
                <template slot-scope="{ item }">
                  <div class="name">{{ item.value }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.type" placeholder="按类别筛选" clearable>
                <el-option v-for="item in typeList" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.category" placeholder="按类型筛选" clearable>
                <el-option v-for="item in categoryList" :key="item" :label="item" :value="item"></el-option>
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
        <el-table ref="multipleTable" :data="tableDate" style="width: 100%" :row-style="{ height: '100px' }" :cell-style="{ padding: '2' }">
          <el-table-column label="名称" prop="name" sortable width="280">
            <template slot-scope="{ row }">
              <div class="el-row--flex is-align-middle">
                <el-tooltip class="item" effect="dark" content="查看可视化" placement="top-start">
                  <el-button type="text" icon="el-icon-search" class="px-5 py-0" @click.stop="showVisualModal(row['id'])"></el-button>
                </el-tooltip>
                <nuxt-link class="text-truncate" :to="localePath('/application/doc/' + row['id'])" :title="row.name">
                  {{ row.title }}
                </nuxt-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="类别" prop="type" sortable width="120">
            <template slot-scope="{ row }">
              {{ row.type | pipeTypeTranslate | t }}
            </template>
          </el-table-column>
          <el-table-column label="分类" prop="category" sortable width="120"></el-table-column>
          <!-- <el-table-column label="最近版本" prop="version" width="120"></el-table-column> -->
          <el-table-column label="摘要" prop="description">
            <template slot-scope="{ row }">
              {{ row.content | intercept }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import CanCreate from '@/components/common/CanCreate'
import intercept from '@/filters/intercept'
import pipeConstants from '@/constants/PipeConstants'
export default {
  components: { CanCreate },
  filters: {
    ...intercept,
    pipeTypeTranslate: pipeConstants.translate.bind(pipeConstants),
  },
  async asyncData({ app }) {
    const items = await app.$axios.$get('/v1/blogs')
    return { items }
  },
  data() {
    return {
      query: {
        name: this.$route.query.name || '',
        category: this.$route.query.category || '',
        type: this.$route.query.type || '',
      },
      items: [],
      typeList: pipeConstants.items,
    }
  },
  computed: {
    categoryList() {
      return this.items.reduce((list, item) => {
        if (!list.includes(item.category)) {
          list.push(item.category)
        }
        return list
      }, [])
    },
    nameList() {
      return this.items.reduce((list, item) => {
        if (!list.includes(item.name)) {
          list.push({ value: item.name })
        }
        return list
      }, [])
    },
    tableDate() {
      let data = this.items
      if (this.query.category !== '') {
        data = data.filter((item) => {
          return item.category === this.query.category
        })
      }
      if (this.query.name !== '') {
        data = data.filter((item) => {
          return item.name.includes(this.query.title)
        })
      }
      if (this.query.type !== '') {
        data = data.filter((item) => {
          return item.type === this.query.type
        })
      }
      return data
    },
    selection() {
      return this.$refs.multipleTable ? this.$refs.multipleTable.selection : []
    },
    hasSelection() {
      return this.selection.length > 0
    },
  },
  methods: {
    createFilter(str) {
      return (name) => {
        return name.value.toLowerCase().includes(str.toLowerCase())
      }
    },
    queryName(str, cb) {
      const nameList = this.nameList
      const results = str ? nameList.filter(this.createFilter(str)) : nameList
      cb(results)
    },
    showVisualModal(id) {
      // window.open(`/graph-info/${id}`, '_blank', 'toolbar=0,location=0,menubar=0')
      window.open(`/graph-info/${id}`, '_blank')
    },
  },
}
</script>
