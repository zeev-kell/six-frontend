<template>
  <div class="container-fluid el-row el-row--flex">
    <div class="el-col el-col-18 pr-20">
      <div class="card">
        <div class="card-header el-row el-row--flex is-align-middle py-5">
          <h2>{{ item.name }}</h2>
        </div>
        <div v-marked="item.readme" class="card-body"></div>
      </div>
    </div>
    <div class="el-col- el-col-6">
      <div class="card">
        <div class="card-header el-row el-row--flex is-align-middle py-5">
          <h4>创建人</h4>
        </div>
        <div class="card-body">
          {{ item.provider }}
        </div>
      </div>
      <div class="card">
        <div class="card-header el-row el-row--flex is-align-middle py-5">
          <h4>其他信息</h4>
        </div>
        <div class="card-body">
          <p>创建时间<br />{{ item.create_at }}</p>
          <p>资源分类<br />{{ item.category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import marked from '@/directives/marked/marked'
import DatumItemMixin from '@/pages/application/datum/_components/DatumItemMixin.vue'

@Component({
  directives: {
    ...marked,
  },
})
export default class DatumIndex extends DatumItemMixin {}
</script>
