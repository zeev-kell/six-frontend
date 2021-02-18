<template>
  <div class="container-fluid">
    <div class="panel panel-body">
      <div class="search-box">
        <el-form :inline="true" :model="query">
          <el-form-item>
            <el-autocomplete v-model="query.name" :fetch-suggestions="queryName" placeholder="按名字筛选">
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.type" placeholder="按类别筛选" clearable>
              <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.category" placeholder="按类型筛选" clearable>
              <el-option v-for="item in categoryList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-box">
        <el-table :data="tableDate" style="width: 100%">
          <el-table-column label="流程名称" prop="name" sortable width="280">
            <template slot-scope="{ row }">
              <div class="el-row--flex is-align-middle">
                <el-tooltip class="item" effect="dark" content="查看可视化" placement="top-start">
                  <el-button
                    type="text"
                    icon="el-icon-search"
                    class="px-5 py-0"
                    @click.stop="showVisualModal(row['pipe_id'])"
                  ></el-button>
                </el-tooltip>
                <nuxt-link class="text-truncate" :to="'/application/pipe/' + row['pipe_id']" :title="row.name">
                  {{ row.name }}
                </nuxt-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="类别" prop="type" sortable width="120">
            <template slot-scope="{ row }">
              {{ row.type | pipeTypeFilter }}
            </template>
          </el-table-column>
          <el-table-column label="分类" prop="category" sortable width="120"></el-table-column>
          <el-table-column label="最近版本" prop="version" width="120"></el-table-column>
          <el-table-column label="流程介绍" prop="description">
            <template slot-scope="{ row }">
              {{ row.description | intercept }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import intercept from '@/filters/intercept'
  import pipeConstants from '@/constants/PipeConstants'
  export default {
    filters: {
      ...intercept,
      pipeTypeFilter: pipeConstants.filter.bind(pipeConstants),
    },
    async asyncData({ app }) {
      const items = await app.$axios.$get('/pipes')
      return { items }
    },
    data() {
      return {
        query: {
          name: this.$route.query.name || '',
          category: this.$route.query.category || '',
          type: this.$route.query.type || undefined,
        },
        items: [],
        typeList: pipeConstants.toItems(),
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
        if (this.query.category) {
          data = data.filter((item) => {
            return item.category === this.query.category
          })
        }
        if (this.query.name) {
          data = data.filter((item) => {
            return item.name.includes(this.query.name)
          })
        }
        if (this.query.type) {
          data = data.filter((item) => {
            return item.type === this.query.type
          })
        }
        return data
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
