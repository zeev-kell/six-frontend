<template>
  <div class="pipe-container">
    <div class="el-row el-row--flex is-align-middle py-5">
      <div class="el-col-auto px-20">
        <i class="el-icon-s-tools" style="font-size: 36px"></i>
      </div>
      <div class="el-col el-col-16 text-truncate mx-0">
        <h2 class="text-truncate my-0" :title="item['name']">
          {{ item['name'] }}
        </h2>
        <p class="m-y-05">ID: {{ item.resource_id }}</p>
        <div class="el-row el-row--flex item-tip">
          <div class="el-col">
            <div class="title">类别</div>
            <div>{{ item.type | pipeTypeTranslate | t }}</div>
          </div>
          <div class="el-col">
            <div class="title">版本</div>
            <div>{{ item.version }}</div>
          </div>
          <div class="el-col">
            <div class="title">最近更新</div>
            <div>{{ item.create_at }}</div>
          </div>
        </div>
      </div>
      <div class="el-col el-col-8 text-right">
        <nuxt-link v-slot="{ href }" :to="localePath('/graph-info/' + item['pipe_id'] + '/set-run')" custom>
          <a :href="href" target="_blank">
            <el-button type="primary" icon="el-icon-caret-right">设置运行</el-button>
          </a>
        </nuxt-link>
        <el-dropdown trigger="click" size="medium" @command="handleDownload">
          <el-button type="info" icon="el-icon-download">下载</el-button>
          <el-dropdown-menu slot="dropdown" class="el-dropdown-info">
            <el-dropdown-item command="json">JSON 格式</el-dropdown-item>
            <el-dropdown-item command="yaml">YAML 格式</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <can-create v-if="item.provider !== username">
          <nuxt-link v-slot="{ navigate }" :to="localePath('/application/pipe/' + item['pipe_id'] + '/edit-pipe')" custom>
            <el-button type="primary" icon="el-icon-edit" @click="navigate" @keypress.enter="navigate">编辑</el-button>
          </nuxt-link>
        </can-create>
        <can-examine>
          <el-button type="danger" icon="el-icon-delete" @click="handleDeletePipe">删除</el-button>
        </can-examine>
      </div>
    </div>
    <el-tabs v-model="activeTab" class="pt-15">
      <el-tab-pane label="资源介绍" name="application-pipe-id" />
      <el-tab-pane label="工具结构" name="application-pipe-id-structure" />
      <el-tab-pane label="使用教程" name="application-pipe-id-course" />
      <el-tab-pane label="运行案例" name="application-pipe-id-case" />
      <el-tab-pane label="历史版本" name="application-pipe-id-versions" />
    </el-tabs>
    <nuxt-child />
  </div>
</template>

<script type="text/babel">
import pipeConstants from '@/constants/PipeConstants'
import { getObject, stringifyObject } from '@/pages/application/_components/graph/plugins/yaml-handle'
import { downloadStrLink } from '@/utils/download-link'

export default {
  filters: {
    pipeTypeTranslate: pipeConstants.translate.bind(pipeConstants),
  },
  async asyncData({ app, params, store }) {
    // params.id = 'bd5adb8d-8615-4a09-9cf8-fa0005de6518'
    const item = await app.$axios.$get(`/v2/pipe/${params.id}`)
    if (typeof item.content === 'string') {
      // 尝试转换字段为 json 对象
      item.content = getObject(item.content)
    }
    // FIXME 适配
    item.pipe_id = item.resource_id
    item.tutorial = item.tutorial?.replace(/[↵ ]{2,}/g, '  \n')
    store.commit('pipe/UPDATE_CURRENT_WORKFLOW', item)
    return {}
  },
  computed: {
    item() {
      return this.$store.state.pipe
    },
    username() {
      return this.$store.getters.username
    },
    activeTab: {
      get() {
        return this.getRouteBaseName()
      },
      set(value) {
        this.$I18nRouter.push({ name: value, params: this.$route.params })
      },
    },
    isTool() {
      return this.$store.getters['pipe/isTool']
    },
  },
  methods: {
    handleDownload(format = 'yaml') {
      const asYaml = format === 'yaml'
      const data = stringifyObject(this.item.content, asYaml)
      const name = this.item?.name + `.${asYaml ? 'cwl' : format}`
      downloadStrLink(data, name)
    },
    handleDeletePipe() {
      this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return this.$$axios.delete('/v1/pipe/' + this.$route.params.id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.$I18nRouter.push('/application/pipes')
          })
        })
        .catch(() => {})
    },
  },
}
</script>
<style lang="scss">
.item-tip {
  padding: 5px 0 0;
  > div {
    padding-right: 20px;
    + div {
      padding-left: 20px;
      border-left: 1px solid #cccccc;
    }
  }
  .title {
    margin-bottom: 5px;
    font-weight: 600;
  }
}
</style>
