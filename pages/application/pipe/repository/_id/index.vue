<template>
  <div class="container-fluid py-10">
    <div class="el-row el-row--flex is-align-middle info-header">
      <div class="el-col-auto px-20">
        <i v-if="isApp" class="el-icon-s-tools" style="font-size: 36px" />
        <i v-if="isWork" class="el-icon-reading" style="font-size: 36px" />
      </div>
      <div class="el-col el-col-16 text-truncate mx-0">
        <h2 v-truncate="item['name']" class="my-0"></h2>
        <p class="m-y-05">ID: {{ item.pipe_id }}</p>
        <div class="el-row el-row--flex info-tip">
          <div class="el-col">
            <div class="title">类别</div>
            <div>{{ item.type | pipeTypeTranslate | t({ prefix: 'constant.' }) }}</div>
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
        <!-- <nuxt-link v-if="isApp" v-slot="{ href }" :to="localePath('/graph-info/' + item['resource_id'] + '/set-run')" custom>
          <a :href="href" target="_blank">
            <el-button type="primary" icon="el-icon-caret-right">设置运行</el-button>
          </a>
        </nuxt-link>
        <nuxt-link
          v-else-if="isWork && item['cwl']"
          v-slot="{ href }"
          :to="
            localePath({
              name: 'graph-info-id-set-run',
              params: {
                id: item['cwl'],
              },
              query: {
                profile: item['resource_id'],
              },
            })
          "
          custom
        >
          <a :href="href" target="_blank">
            <el-button type="primary" icon="el-icon-caret-right">设置运行</el-button>
          </a>
        </nuxt-link>
        <el-dropdown trigger="click" size="medium" @command="handleDownload">
          <el-button type="info" icon="el-icon-download"> 下载 </el-button>
          <el-dropdown-menu slot="dropdown" class="el-dropdown-info">
            <el-dropdown-item command="json"> JSON 格式 </el-dropdown-item>
            <el-dropdown-item command="yaml"> YAML 格式 </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <can-create :is-user="item.provider">
          <!-- <loading-button type="default" icon="el-icon-plus" class="mx-0" :callback="handleDelete"> 添加版本 </loading-button> -->
          <nuxt-link v-slot="{ navigate }" :to="localePath('application-pipe-new')" custom>
            <el-button type="primary" size="small" role="link" icon="el-icon-plus" @click="navigate" @keypress.enter="navigate"> 添加版本 </el-button>
          </nuxt-link>
        </can-create>
        <can-create :is-user="item.provider">
          <toggle-edit-info type="primary" size="small" icon="el-icon-edit"> 管理应用 </toggle-edit-info>
        </can-create>

      </div>
    </div>
    <el-tabs v-model="activeTab" class="info-el-tabs" :before-leave="onBeforeLeave">
      <el-tab-pane label="资源介绍" name="application-pipe-repository-id-index" />
      <!-- <el-tab-pane v-if="isWork" label="工作结构" name="application-pipe-id-index-work" /> -->
      <!-- <el-tab-pane v-if="isApp" label="工具结构" name="application-pipe-id-index-structure" /> -->
      <!-- <el-tab-pane label="使用教程" name="application-pipe-id-index-course" /> -->
      <!-- <el-tab-pane v-if="isApp" label="运行案例" name="application-pipe-id-index-case" /> -->
      <el-tab-pane v-if="isApp" label="应用版本" name="application-pipe-repository-id-index-version" />
    </el-tabs>
    <div class="px-20 mt-5 pb-10 no-gutters">
      <nuxt-child />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { getObject, stringifyObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import { downloadStrLink } from '@/utils/download-link'
import CanCreate from '@/components/common/CanCreate.vue'
import CanExamine from '@/components/common/CanExamine.vue'
import ToggleEditInfo from '@/pages/application/_components/ToggleEditInfo.vue'
import PipeMixin from '@/pages/application/pipe/repository/_components/PipeMixin.vue'
import PipeItemMixin from '@/pages/application/pipe/repository/_components/PipeItemMixin.vue'
import LayoutBox from '@/pages/_components/LayoutBox.vue'
import LoadingButton from '@/components/LoadingButton.vue'

@Component({
  components: { LoadingButton, LayoutBox, ToggleEditInfo, CanExamine, CanCreate },
})
export default class PipeIdIndex extends mixins<PipeItemMixin>(PipeMixin) {
  // handleDownload(format = 'yaml'): void {
  //   const asYaml = format === 'yaml'
  //   const data = stringifyObject(getObject(this.item.content), asYaml)
  //   const name = this.item.name + `.${asYaml ? 'cwl' : format}`
  //   downloadStrLink(data, name)
  // }
  handleDelete(): Promise<any> {
    return this.$confirm('此操作将永久删除该软件, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      return this.$api.pipe.removeVersion(this.$route.params.id).then(() => {
        this.$I18nRouter.push('/application/pipes')
      })
    })
  }
}
</script>
