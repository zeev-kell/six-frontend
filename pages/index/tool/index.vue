<template>
  <div class="container-fluid">
    <div class="panel">
      <div class="search-box">
        <el-form :inline="true" :model="params">
          <el-form-item>
            <el-select v-model="params.name" placeholder="按名字筛选">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="params.type" placeholder="按类型筛选">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
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
          <el-table-column prop="description" label="软件介绍"> </el-table-column>
          <el-table-column prop="type" label="分类" width="120"> </el-table-column>
          <el-table-column prop="version" label="最近版本" width="120"> </el-table-column>
          <el-table-column prop="configuration" label="软件配置" width="120"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    async asyncData({ app, params }) {
      const { data } = await app.$axios.get('/tools')
      // eslint-disable-next-line no-console
      console.log(data)
      return { items: data.tools }
    },
    data() {
      return {
        params: {
          name: '',
          type: '',
          category: '',
        },
        items: [],
        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
        ],
      }
    },
  }
</script>

<style scoped lang="scss"></style>
