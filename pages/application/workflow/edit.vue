<template>
  <div class="container-fluid">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="panel panel-body">
          <el-form label-position="top">
            <el-form-item label="搜索工具">
              <el-input v-model="keyWords" placeholder="请输入内容" suffix-icon="el-icon-search"> </el-input>
            </el-form-item>
          </el-form>
          <div>
            <label> 已选工具 </label>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="panel panel-body">
          <el-table :data="tableDate" style="width: 100%">
            <el-table-column label="软件名称" prop="pipe_name" sortable width="120"></el-table-column>
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
      </el-col>
    </el-row>
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
        keyWords: '',
      }
    },
  }
</script>

<style scoped lang="scss"></style>
