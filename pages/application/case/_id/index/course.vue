<template>
  <div class="container-fluid" style="overflow: inherit">
    <el-row v-if="blog" type="flex">
      <el-col class="marked-content el-col-equal pr-20">
        <mavon-editor-render-client v-if="blog.content" ref="MavonEditor" :value="blog.content" />
      </el-col>
      <el-col style="width: 260px">
        <div class="card">
          <div class="card-header el-row el-row--flex is-align-middle py-5">
            <h4>引用自</h4>
          </div>
          <div class="card-body">
            <div style="font-weight: 600; margin-bottom: 10px">知识库文档</div>
            {{ item.instruction }}
          </div>
        </div>
        <client-only>
          <div class="p-s" style="top: 10px">
            <el-scrollbar :native="false">
              <mavon-editor-toc :toc="toc" style="height: calc(100vh - 30px)"></mavon-editor-toc>
            </el-scrollbar>
          </div>
        </client-only>
      </el-col>
    </el-row>
    <div v-else>暂无使用教程</div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import MavonEditorRenderClient from '@/pages/application/_components/mavonEditor/MavonEditorRenderClient.vue'
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'
import { resourceHelp } from '@/utils/resource-help'
import { CaseModel } from '@/types/model/Case'
import { BlogModel } from '@/types/model/Blog'
import MavonEditorToc from '@/pages/application/_components/mavonEditor/MavonEditorToc.vue'

@Component({
  components: { MavonEditorToc, MavonEditorRenderClient },
  async asyncData({ app, store }) {
    const item: CaseModel = store.state.case
    if (item.instruction) {
      const blog: BlogModel = await app.$api.blog.get(item.instruction)
      return { blog }
    }
  },
})
export default class Course extends CaseItemMixin {
  $refs!: {
    MavonEditor: MavonEditorRenderClient
  }
  blog: BlogModel | null = null
  toc: any[] = []
  mounted(): Promise<any> | void {
    this.$nextTick(() => {
      this.toc = this.$refs.MavonEditor.getNavigation()
    })
  }
}
</script>
