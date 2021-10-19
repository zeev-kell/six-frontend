<template>
  <div class="datum-container">
    <div class="el-row el-row--flex is-align-middle info-header">
      <div class="el-col-auto px-20">
        <i v-if="isFormat" class="el-icon-notebook-1" style="font-size: 36px" />
        <i v-if="isData" class="el-icon-document" style="font-size: 36px" />
        <i v-if="isDataPackage" class="el-icon-files" style="font-size: 36px" />
      </div>
      <div class="el-col el-col-16 text-truncate mx-0">
        <h2 class="text-truncate my-0" :title="item['name']">
          {{ item['name'] }}
        </h2>
        <p class="m-y-05">ID: {{ item.resource_id }}</p>
        <div class="el-row el-row--flex info-tip">
          <div class="el-col">
            <div class="title">类别</div>
            <div>{{ item.type | datumTypeTranslate | t }}</div>
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
        <el-button type="info" icon="el-icon-download"> 下载 </el-button>
        <can-create v-if="item.provider === username">
          <nuxt-link v-slot="{ navigate }" :to="localePath('/application/datum/' + item['resource_id'] + '/edit')" custom>
            <el-button type="primary" icon="el-icon-edit" @click="navigate" @keypress.enter="navigate"> 编辑 </el-button>
          </nuxt-link>
        </can-create>
        <can-examine>
          <el-button type="danger" icon="el-icon-delete" @click="handleDeleteDatum"> 删除 </el-button>
        </can-examine>
      </div>
    </div>
    <el-tabs v-model="activeTab" class="info-el-tabs" :before-leave="onBeforeLeave">
      <el-tab-pane label="资源介绍" name="application-datum-id-index" />
      <el-tab-pane v-if="isFormat" label="格式规范" name="application-datum-id-index-format" />
      <el-tab-pane v-if="isFormat" label="历史版本" name="application-datum-id-index-version" />
      <el-tab-pane v-if="!isFormat" label="数据结构" name="application-datum-id-index-structure" />
      <el-tab-pane v-if="!isFormat" label="数据下载" name="application-datum-id-index-manage" />
      <el-tab-pane v-if="!isFormat" label="处理流程" name="application-datum-id-index-process" />
    </el-tabs>
    <div class="px-20 mt-5">
      <nuxt-child />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import CanCreate from '@/components/common/CanCreate.vue'
import CanExamine from '@/components/common/CanExamine.vue'
import { datumConstants } from '@/constants/DatumConstants'
import { mapGetters } from 'vuex'

@Component({
  components: { CanExamine, CanCreate },
  scrollToTop: true,
  filters: {
    datumTypeTranslate: datumConstants.get,
  },
  async middleware({ store, params, app }) {
    const datum = store.state.datum
    // ID 不同，需要重新请求数据
    if (params.id !== datum.resource_id) {
      const item = await app.$api.datum.get(params.id)
      store.commit('datum/UPDATE_CURRENT_DATUM', item)
    }
  },
  computed: {
    ...mapGetters({
      isFormat: 'datum/isFormat',
      isData: 'datum/isData',
      isDataPackage: 'datum/isDataPackage',
      username: 'user/username',
    }),
  },
})
export default class DatumIdIndex extends Vue {
  activeTab = this.getRouteBaseName()
  get item() {
    return this.$store.state.datum
  }

  @Watch('$route.params')
  onWatchParams() {
    this.$nextTick(() => {
      // 强制使当前 tab 切换到当前路由
      // 会触发 onBeforeLeave onAbort
      this.activeTab = this.getRouteBaseName()
    })
  }

  handleDeleteDatum() {
    this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        return this.$$axios.delete('/v2/datum/' + this.$route.params.id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.$I18nRouter.push('/application/datums')
        })
      })
      .catch(() => {})
  }
  onBeforeLeave(activeName: string): Promise<void> {
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
  }
}
</script>
