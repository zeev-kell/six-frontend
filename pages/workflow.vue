<template>
  <div class="container-fluid full-height">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="tool-container panel">
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
      <el-col :span="18"><div class="pipe-container panel"></div></el-col>
    </el-row>
  </div>
</template>

<script type="text/babel">
  export default {
    layout: 'nav-bar-auth',
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
