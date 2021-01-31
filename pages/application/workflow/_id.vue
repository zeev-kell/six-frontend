<template>
  <div class="container-fluid">
    <div class="panel">
      <div class="panel-header el-row el-row--flex is-align-middle py-5">
        <h2 class="el-col el-col-16 text-truncate mx-0" :title="item['workflow_name']">
          {{ item['workflow_name'] }}
        </h2>
        <div class="el-col el-col-8 text-right">
          <el-button type="primary" icon="el-icon-download">添加至本地</el-button>
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
            {{
              Array.from({ length: 30 })
                .map(() => item.description)
                .join(' ')
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-body w-cwl">
        <workflow-cwl cwl-url="/rna-seq-alignment.json" :plugins="plugins" :editing-enabled="true"></workflow-cwl>
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
  import { SVGArrangePlugin } from 'cwl-svg'
  import WorkflowCwl from './_components/WorkflowCwl'

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
        item: {},
        plugins: [new SVGArrangePlugin()],
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
  .w-cwl {
    min-height: 400px;
    height: 400px;
  }
</style>
