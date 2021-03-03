<template>
  <div class="container-fluid">
    <div class="panel">
      <div class="panel-header el-row el-row--flex is-align-middle py-5">
        <h2 class="el-col el-col-16 text-truncate mx-0" :title="item['name']">
          {{ item['name'] }}
        </h2>
        <div class="el-col el-col-8 text-right">
          <!--          <el-button type="primary" icon="el-icon-document-copy" size="medium">复制</el-button>-->
          <a :href="'/graph-info/' + item['pipe_id'] + '/set-run'" target="_blank">
            <el-button type="primary" icon="el-icon-caret-right" size="medium">设置运行</el-button>
          </a>
          <el-dropdown trigger="click" size="medium" @command="handleDownload">
            <el-button type="info" icon="el-icon-download" size="medium">下载</el-button>
            <el-dropdown-menu slot="dropdown" class="el-dropdown-info">
              <el-dropdown-item command="json">JSON 格式</el-dropdown-item>
              <el-dropdown-item command="cwl">YAML 格式</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="panel-body w-info">
        <div class="el-row">
          <label class="el-col el-col-2">ID</label>
          <div class="el-col el-col-equal">{{ item['pipe_id'] }}</div>
        </div>
        <div class="el-row">
          <label class="el-col el-col-2">版本</label>
          <div class="el-col el-col-equal">{{ item['version'] }}</div>
        </div>
        <div class="el-row">
          <label class="el-col el-col-2">创建人</label>
          <div class="el-col el-col-equal">{{ item['provider'] }}</div>
        </div>
        <div class="el-row">
          <label class="el-col el-col-2">创建时间</label>
          <div class="el-col el-col-equal">{{ item['create_at'] }}</div>
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
      <div class="panel-header">
        <h2 class="mx-0">示例教程</h2>
      </div>
      <div v-marked="item.tutorial" class="panel-body"></div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <h2 class="mx-0">软件结构与参数配置（双击图标进入配置界面）</h2>
      </div>
      <div class="panel-body">
        <div class="workflow-box">
          <cwl-graph ref="cwl" :item="item" :readonly="true" class="h-100" />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import marked from '@/directives/marked'
  import CwlGraph from '@/pages/application/_components/cwl-graph/CwlGraph'
  import downloadLink from '@/utils/download-link'

  export default {
    directives: {
      ...marked,
    },
    components: { CwlGraph },
    async asyncData({ app, params }) {
      // const item = await app.$axios.$get(`/pipe/${params.id}`)
      const item = await app.$axios.$get(`/pipe?pipe_id=${params.id}`)
      return { item }
    },
    data() {
      return {
        item: null,
      }
    },
    methods: {
      handleDownload(type = 'json') {
        const data = this.$refs.cwl.serialize(type === 'cwl')
        downloadLink(data, this.item.name + `.${type}`)
      },
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
    height: 100vh;

    /*
    /deep/ .el-tabs__content {
      height: calc(100vh - 47px - 30px - 40px - 15px - 30px);
      min-height: 450px - 47px - 30px - 40px - 15px - 30px;
    }
    /deep/ .panel-body.scrollbar {
      height: calc(100vh - 47px - 30px);
      min-height: 450px - 47px - 30px;
    }
    */
  }
</style>
