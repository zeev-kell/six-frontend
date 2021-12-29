<template>
  <el-pagination
    v-bind="$attrs"
    :background="true"
    :current-page.sync="listQuery.page"
    :page-size.sync="listQuery.size"
    layout="sizes, total, ->, prev, pager, next, jumper"
    v-on="$listeners"
  ></el-pagination>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { tableQuery } from '@/types/response'

@Component
export default class TablePagination extends Vue {
  @Prop({ default: 1 })
  page = 1
  @Prop({ default: 10 })
  limit = 10
  @Prop({ required: true })
  listQuery!: tableQuery
}
</script>
