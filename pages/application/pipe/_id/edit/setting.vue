<template>
  <div class="container-fluid">
    <div class="card-body el-row">
      <div class="el-col-12">
        <el-form ref="formModel" label-width="80px" :model="formModel" :rules="rules" size="medium">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formModel.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="版本" prop="version">
            <el-input v-model="formModel.version" placeholder="请输入版本" />
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-input v-model="formModel.category" placeholder="请输入分类" />
          </el-form-item>
          <el-form-item label="地址" prop="description">
            <el-input v-model="formModel.website" placeholder="请输入地址" />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="formModel.description" type="textarea" :rows="4" placeholder="请输入描述" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      formModel: {},
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 128, message: '长度在 2 到 128 个字符', trigger: 'blur' },
        ],
        version: [
          { required: true, message: '请输入版本', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
        ],
        category: [
          { required: true, message: '请输入分类', trigger: 'blue' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    item() {
      return this.$store.state.pipe
    },
  },
  mounted() {
    this.formModel = Object.assign({}, this.item)
  },
}
</script>

<style lang="scss"></style>
