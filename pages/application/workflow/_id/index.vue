<template>
  <div class="container-fluid">
    <div class="panel">
      <div class="panel-header el-row el-row--flex is-align-middle py-5">
        <h2 class="el-col el-col-16 text-truncate mx-0" :title="item['workflow_name']">
          {{ item['workflow_name'] }}
        </h2>
        <div class="el-col el-col-8 text-right">
          <el-button type="primary" icon="el-icon-document-copy" size="medium">复制</el-button>
          <el-button type="info" icon="el-icon-download" size="medium">下载</el-button>
        </div>
      </div>
      <div class="panel-body w-info">
        <div class="el-row">
          <label class="el-col el-col-2">ID</label>
          <div class="el-col el-col-equal">{{ item['workflow_id'] }}</div>
        </div>
        <div class="el-row">
          <label class="el-col el-col-2">版本</label>
          <div class="el-col el-col-equal">{{ item['version'] }}</div>
        </div>
        <div class="el-row">
          <label class="el-col el-col-2">发布人</label>
          <div class="el-col el-col-equal">{{ item['provider'] }}</div>
        </div>
        <div class="el-row">
          <label class="el-col el-col-2">发布时间</label>
          <div class="el-col el-col-equal">{{ item['public_time'] }}</div>
        </div>
        <hr />
        <div class="el-row">
          <label class="el-col el-col-2 mb-10">描述</label>
          <div class="col-100"></div>
          <div class="el-col el-col-24">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body workflow-box">
        <workflow-cwl :cwl="item.cwl_json"></workflow-cwl>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body">
        <h2>示例教程</h2>
        <p>新型冠状病毒(SARS)的主要特性及其防治 新型冠状病毒(SARS)的主要特性及其防治</p>
        <p>新型冠状病毒(SARS)的主要特性及其防治 新型冠状病毒(SARS)的主要特性及其防治</p>
        <p>新型冠状病毒(SARS)的主要特性及其防治 新型冠状病毒(SARS)的主要特性及其防治</p>
        <p>新型冠状病毒(SARS)的主要特性及其防治 新型冠状病毒(SARS)的主要特性及其防治</p>
        <p>新型冠状病毒(SARS)的主要特性及其防治 新型冠状病毒(SARS)的主要特性及其防治</p>
        <p>新型冠状病毒(SARS)的主要特性及其防治 新型冠状病毒(SARS)的主要特性及其防治</p>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import WorkflowCwl from '@/pages/application/_components/WorkflowCwl'

  export default {
    components: {
      WorkflowCwl,
    },
    async asyncData({ app, params }) {
      const item = await app.$axios.$get(`/workflow/${params.id}`)
      return { item }
    },
    data() {
      return {
        item: undefined,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .w-info {
    .el-row {
      margin-bottom: 10px;
    }
    label {
      font-weight: bold;
    }
  }
  .workflow-box {
    min-height: 450px;
    height: 450px;
  }
</style>
