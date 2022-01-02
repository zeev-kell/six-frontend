<template>
  <el-table :data="versions" class="w-100">
    <el-table-column prop="resource_id" label="ID">
      <template slot-scope="{ row }">
        <nuxt-link :to="localePath('/application/pipe/' + row['resource_id'])">
          {{ row.resource_id }}
        </nuxt-link>
      </template>
    </el-table-column>
    <el-table-column prop="version" label="版本" width="180" />
    <el-table-column prop="create_at" label="创建时间" />
    <el-table-column prop="updated_at" label="更新时间" />
  </el-table>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import PipeRepositoryItemMixin from '@/pages/application/pipe/repository/_components/PipeRepositoryItemMixin.vue'

@Component
export default class PipeVersion extends PipeRepositoryItemMixin {
  get versions() {
    return this.item?.versions || []
  }
}
</script>
