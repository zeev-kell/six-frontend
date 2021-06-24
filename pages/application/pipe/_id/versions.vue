<template>
  <el-table :data="versions" style="width: 100%">
    <el-table-column prop="resource_id" label="ID">
      <template slot-scope="scope">
        <span v-if="scope.row['resource_id'] === $route.params.id" class="text-muted">
          {{ scope.row.resource_id }}
        </span>
        <nuxt-link v-else :to="'/application/pipe/' + scope.row['resource_id']">
          {{ scope.row.resource_id }}
        </nuxt-link>
      </template>
    </el-table-column>
    <el-table-column prop="version" label="版本" width="180"> </el-table-column>
    <el-table-column prop="provider" label="创建者" width="180"> </el-table-column>
    <el-table-column prop="create_time" label="创建时间"> </el-table-column>
    <el-table-column prop="updated_time" label="更新时间"> </el-table-column>
  </el-table>
</template>

<script type="text/babel">
export default {
  computed: {
    item() {
      return this.$store.state.pipe
    },
    versions() {
      return this.item?.versions || []
    },
  },
}
</script>

<style lang="scss"></style>
