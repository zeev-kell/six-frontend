<template>
  <div class="structure">
    <div v-if="item.content" class="card">
      <div class="card-header el-row--flex is-align-middle">
        <h2 class="mx-0 el-col-equal">软件结构与参数配置（双击图标查看配置）</h2>
      </div>
      <div class="card-body">
        <div class="page-graph-box">
          <graph-index :item="item" :readonly="true" class="h-100" tools="run|plus,minus,fit|auto" />
        </div>
      </div>
    </div>
    <div v-else>暂无软件结构</div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'

@Component({
  components: { GraphIndex },
})
export default class Structure extends PipeItemMixin {}
</script>
