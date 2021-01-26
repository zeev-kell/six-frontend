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
          <el-table-column label="软件名称" prop="pipe_name" sortable width="200"></el-table-column>
          <el-table-column label="分类" prop="category" sortable width="120"></el-table-column>
          <el-table-column label="最近版本" prop="version" width="120"></el-table-column>
          <el-table-column label="软件配置" prop="configuration" width="120">
            <template slot-scope="{ row }">
              <el-button type="normal" size="small" @click="showConfig(row)">
                配置<i class="iconfont icon-ellipsis-vertical"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="软件介绍" prop="description"></el-table-column>
        </el-table>
      </div>
      <div class="dialog-box">
        <pipe-info-dialog ref="info-dialog"></pipe-info-dialog>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import PipeInfoDialog from './components/PipeInfoDialog'
  export default {
    components: {
      PipeInfoDialog,
    },
    async asyncData({ app }) {
      const items = await app.$axios.$get('/pipes')
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
          if (!list.includes(item.pipe_name)) {
            list.push({ value: item.pipe_name })
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
            return item.pipe_name.includes(this.params.name)
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
      showConfig(row) {
        // 转成字符代替深拷贝
        const _row = JSON.stringify(row)
        this.$refs['info-dialog'].show(JSON.parse(_row))
      },
    },
  }
</script>
