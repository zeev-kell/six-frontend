<template>
  <el-table :data="versions" style="width: 100%">
    <el-table-column prop="resource_id" label="ID">
      <template slot-scope="scope">
        <span v-if="scope.row['resource_id'] === $route.params.id" class="text-muted p-r el-row--flex is-align-middle">
          {{ scope.row.resource_id }}
        </span>
        <nuxt-link v-else :to="localePath('/application/pipe/' + scope.row['resource_id'])">
          {{ scope.row.resource_id }}
        </nuxt-link>
      </template>
    </el-table-column>
    <el-table-column prop="version" label="版本" width="180" />
    <el-table-column prop="create_at" label="创建时间" />
    <el-table-column prop="updated_at" label="更新时间" />
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class Versions extends Vue {
  get item() {
    return this.$store.state.pipe
  }
  get versions() {
    return this.item?.versions || []
  }
}
</script>
