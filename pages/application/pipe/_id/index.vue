<template>
  <div class="container-fluid">
    <div class="panel">
      <div class="panel-header el-row el-row--flex is-align-middle py-5">
        <h2 class="el-col el-col-16 text-truncate mx-0" :title="item['name']">
          {{ item['name'] }}
        </h2>
        <div class="el-col el-col-8 text-right">
          <!--          <el-button type="primary" icon="el-icon-document-copy" >复制</el-button>-->
          <a :href="'/graph-info/' + item['pipe_id'] + '/set-run'" target="_blank">
            <el-button type="primary" icon="el-icon-caret-right">设置运行</el-button>
          </a>
          <el-dropdown trigger="click" size="medium" @command="handleDownload">
            <el-button type="info" icon="el-icon-download">下载</el-button>
            <el-dropdown-menu slot="dropdown" class="el-dropdown-info">
              <el-dropdown-item command="json">JSON 格式</el-dropdown-item>
              <el-dropdown-item command="yaml">YAML 格式</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <can-create v-if="item.provider === username">
            <a :href="'/application/pipe/' + item['pipe_id'] + '/edit-pipe'">
              <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            </a>
          </can-create>
          <can-examine>
            <el-button type="danger" icon="el-icon-delete" @click="handleDeletePipe">删除</el-button>
          </can-examine>
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
      <div v-marked.replace="item.tutorial" class="panel-body"></div>
    </div>
    <div class="panel">
      <div class="panel-header el-row--flex is-align-middle">
        <h2 class="mx-0 el-col-equal">软件结构与参数配置（双击图标查看配置）</h2>
        <div class="el-col-auto">
          <a :href="'/graph-info/' + item['pipe_id'] + '/set-run'" target="_blank">
            <el-button type="primary" icon="el-icon-caret-right">设置运行</el-button>
          </a>
        </div>
      </div>
      <div class="panel-body">
        <div class="workflow-box">
          <graph-index ref="cwl" :item="item" :readonly="true" class="h-100" tools="run|plus,minus,fit|auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import marked from '@/directives/marked'
  import GraphIndex from '@/pages/application/_components/graph/GraphIndex'

  export default {
    directives: {
      ...marked,
    },
    components: { GraphIndex },
    async asyncData({ app, params }) {
      const item = await app.$axios.$get(`/pipe/${params.id}`)
      return { item }
    },
    data() {
      return {
        item: null,
      }
    },
    computed: {
      username() {
        return this.$store.getters.username
      },
    },
    methods: {
      handleDownload(type = 'yaml') {
        this.$refs.cwl.exportCwl(type)
      },
      handleDeletePipe() {
        this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            return this.$$axios.delete('/pipe/' + this.$route.params.id).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.$router.push('/application/pipes')
            })
          })
          .catch(() => {})
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
