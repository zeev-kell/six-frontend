<template>
  <div class="container-fluid el-row el-row--flex">
    <div class="el-col el-col-18 pr-20">
      <div class="panel">
        <div class="panel-header el-row el-row--flex is-align-middle py-5">
          <h2>{{ item.name }}</h2>
        </div>
        <div v-if="item.readme" class="panel-body">
          <div v-marked="item.readme"></div>
        </div>
        <div v-else class="panel-body">
          {{ item.description }}
        </div>
      </div>
    </div>
    <div class="el-col- el-col-6">
      <div class="panel">
        <div class="panel-header el-row el-row--flex is-align-middle py-5">
          <h4>创建人</h4>
        </div>
        <div class="panel-body">{{ item.provider }}</div>
      </div>
      <div class="panel">
        <div class="panel-header el-row el-row--flex is-align-middle py-5">
          <h4>其他信息</h4>
        </div>
        <div class="panel-body">
          <p>创建时间<br />{{ item.create_at }}</p>
          <p>资源分类<br />{{ item.category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import marked from '@/directives/marked'

export default {
  directives: {
    ...marked,
  },
  computed: {
    item() {
      return this.$store.state.pipe
    },
    username() {
      return this.$store.getters.username
    },
  },
}
</script>
