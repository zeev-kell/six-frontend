<template>
  <div class="container-fluid">
    <div class="panel">
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
            <el-select v-model="params.type" placeholder="按类型筛选" clearable>
              <el-option v-for="item in categoryList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="params.category" placeholder="按类别筛选">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool-table">
        <el-table :data="items" style="width: 100%">
          <el-table-column label="软件名称" prop="tool_name" width="120"></el-table-column>
          <el-table-column label="分类" prop="category" sortable width="120"></el-table-column>
          <el-table-column label="最近版本" prop="version" width="120"></el-table-column>
          <el-table-column label="软件配置" prop="configuration" width="120"> 配置<i></i> </el-table-column>
          <el-table-column label="软件介绍" prop="description"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    async asyncData({ app }) {
      const items = await app.$axios.get('/pipes')
      return { items }
    },
    data() {
      return {
        params: {
          name: '',
          type: '',
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
          if (!list.includes(item.tool_name)) {
            list.push({ value: item.tool_name })
          }
          return list
        }, [])
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

<style lang="scss" scoped></style>
