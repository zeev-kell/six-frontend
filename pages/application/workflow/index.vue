<template>
  <div class="container-fluid">
    <div class="panel panel-body">
      <div class="search-box">
        <el-form :inline="true" :model="params">
          <el-form-item>
            <el-autocomplete v-model="params.name" :fetch-suggestions="queryName" placeholder="按名字筛选">
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item>
            <el-select v-model="params.category" placeholder="按类型筛选" clearable>
              <el-option v-for="item in categoryList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-box">
        <el-table :data="tableDate" style="width: 100%">
          <el-table-column label="流程名称" prop="workflow_name" sortable width="240">
            <template slot-scope="{ row }">
              <nuxt-link
                class="text-truncate"
                :to="{ path: '/application/workflow/' + row['workflow_id'] }"
                :title="row.workflow_name"
              >
                {{ row.workflow_name }}
              </nuxt-link>
            </template>
          </el-table-column>
          <el-table-column label="分类" prop="category" sortable width="120"></el-table-column>
          <el-table-column label="最近版本" prop="version" width="120"></el-table-column>
          <el-table-column label="流程介绍" prop="description"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    async asyncData({ app }) {
      const items = await app.$axios.$get('/workflowList')
      return { items }
    },
    data() {
      return {
        params: {
          name: '',
          category: '',
        },
        items: [],
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
          if (!list.includes(item.workflow_name)) {
            list.push({ value: item.workflow_name })
          }
          return list
        }, [])
      },
      tableDate() {
        let data = this.items
        if (this.params.category) {
          data = data.filter((item) => {
            return item.category === this.params.category
          })
        }
        if (this.params.name) {
          data = data.filter((item) => {
            return item.workflow_name.includes(this.params.name)
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
    },
  }
</script>
