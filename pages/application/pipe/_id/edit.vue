<template>
  <div class="pipe-container">
    <div class="el-row el-row--flex is-align-middle pipe-info">
      <div class="el-col-auto px-20">
        <i v-if="isApp" class="el-icon-s-tools" style="font-size: 36px"></i>
        <i v-if="isWork" class="el-icon-reading" style="font-size: 36px"></i>
      </div>
      <div class="el-col el-col-16 text-truncate mx-0">
        <h2 class="text-truncate my-0" :title="item['name']">
          {{ item['name'] }}
        </h2>
        <p class="m-y-05">ID: {{ item.resource_id }}</p>
        <div class="el-row el-row--flex pipe-tip">
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
            <div>{{ item.updated_at }}</div>
          </div>
        </div>
      </div>
      <div class="el-col el-col-8 text-right">
        <can-examine>
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
        </can-examine>
      </div>
    </div>
    <el-tabs v-model="activeTab" class="pipe-el-tabs" :before-leave="onBeforeLeave">
      <el-tab-pane label="资源介绍" name="application-pipe-id-edit" />
      <el-tab-pane v-if="isWork" label="工作结构" name="application-pipe-id-edit-work" />
      <el-tab-pane v-if="isApp" label="工具结构" name="application-pipe-id-edit-structure" />
      <el-tab-pane label="使用教程" name="application-pipe-id-edit-course" />
      <el-tab-pane v-if="isApp" label="运行案例" name="application-pipe-id-edit-case" />
      <el-tab-pane v-if="isApp" label="历史版本" name="application-pipe-id-edit-versions" />
      <el-tab-pane label="管理" name="application-pipe-id-edit-setting" />
    </el-tabs>
    <div class="px-20 mt-5">
      <nuxt-child />
    </div>
  </div>
</template>

<script type="text/babel">
import pipeConstants from '@/constants/PipeConstants'

export default {
  scrollToTop: true,
  filters: {
    pipeTypeTranslate: pipeConstants.translate.bind(pipeConstants),
  },
  async middleware({ store, params, app }) {
    const pipe = store.state.pipe
    // ID 不同，需要重新请求数据
    if (params.id !== pipe.resource_id) {
      // params.id = 'bd5adb8d-8615-4a09-9cf8-fa0005de6518'
      const item = await app.$axios.$get(`/v2/pipe/${params.id}`)
      // eslint-disable-next-line camelcase
      if (item.readme?.by_system) {
        // eslint-disable-next-line camelcase
        item.readme.by_system = item.readme.by_system?.replace(/[↵ ]{2,}/g, '  \n')
      }
      // eslint-disable-next-line camelcase
      if (item.readme?.by_author) {
        // eslint-disable-next-line camelcase
        item.readme.by_author = item.readme.by_author?.replace(/[↵ ]{2,}/g, '  \n')
      }
      item.tutorial = item.tutorial?.replace(/[↵ ]{2,}/g, '  \n')
      store.commit('pipe/UPDATE_CURRENT_WORKFLOW', item)
    }
  },
  data() {
    return {
      activeTab: this.getRouteBaseName(),
    }
  },
  computed: {
    item() {
      return this.$store.state.pipe
    },
    username() {
      return this.$store.getters.username
    },
    isApp() {
      return this.$store.getters['pipe/isSoftware']
    },
    isWork() {
      return this.$store.getters['pipe/isOperation']
    },
  },
  watch: {
    '$route.params'() {
      this.$nextTick(() => {
        // 强制使当前 tab 切换到当前路由
        // 会触发 onBeforeLeave onAbort
        this.activeTab = this.getRouteBaseName()
      })
    },
  },
  methods: {
    handleDelete() {
      return this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return this.$$axios.delete('/v2/pipe/' + this.$route.params.id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.$I18nRouter.push('/application/pipes')
          })
        })
        .catch(() => {})
    },
    onBeforeLeave(activeName) {
      return new Promise((resolve, reject) => {
        this.$I18nRouter.push({ name: activeName, params: this.$route.params }, resolve, (...args) => {
          // 如果是相同的路由，onAbort 会被调用，这时候需要手动 resolve，让 tab 切换
          const activeTab = this.getRouteBaseName()
          if (activeTab === activeName) {
            resolve()
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(...args)
          }
        })
      })
    },
  },
}
</script>
