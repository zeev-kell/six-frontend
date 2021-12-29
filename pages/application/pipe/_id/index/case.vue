<template>
  <div class="container-fluid">
    <div v-if="item.profile" class="el-row el-row--flex">
      <div class="el-col el-col-18 pr-20">
        <div class="card">
          <div class="card-header el-row--flex is-align-middle">
            <h2 class="mx-0 el-col-equal">双击图标查看案例参数</h2>
          </div>
          <div class="card-body">
            <div class="page-graph-box">
              <graph-index
                ref="graph"
                class="h-100"
                :item="item"
                config-type="run"
                tools="import|download|plus,minus,fit"
                @propagate-event="onPropagate"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="el-col- el-col-6">
        <div class="card">
          <div class="card-header el-row el-row--flex is-align-middle py-5">
            <h4>引用自</h4>
          </div>
          <div class="card-body">
            <div style="font-weight: 600; margin-bottom: 10px">
              {{ profile.type | pipeTypeTranslate | t({ prefix: 'constant.' }) }}
            </div>
            <nuxt-link class="text-truncate" :to="localePath('/application/pipe/' + item.profile)" :title="item.profile">
              {{ profile.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>暂无运行案例</div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { GraphEvent } from '@/constants/GraphEvent'
import { pipeConstants } from '@/constants/PipeConstants'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'

@Component({
  filters: {
    pipeTypeTranslate: pipeConstants.get,
  },
  components: { GraphIndex },
})
export default class Case extends PipeItemMixin {
  $refs!: {
    graph: HTMLFormElement
  }
  profile: any = {}

  async onPropagate(eventName: string): Promise<void> {
    // TODO 修改为事件
    // 监听第一次实例化事件
    if (GraphEvent.TriggerPageModalCreate === eventName) {
      const profile = this.profile
      if (profile?.content) {
        this.updateGraphJob()
      } else {
        const profileId = this.item.profile
        if (profileId) {
          this.profile = await this.$api.pipe.getVersion(profileId)
          this.updateGraphJob()
        }
      }
    }
  }
  updateGraphJob() {
    const job = getObject(this.profile.content)
    this.$nextTick(() => {
      this.$refs.graph.dispatchAction('updateJob', job)
    })
  }
}
</script>
