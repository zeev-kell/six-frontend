<template>
  <div class="container-fluid" style="overflow: inherit">
    <el-row v-if="blog" type="flex">
      <el-col class="el-col el-col-equal pr-20">
        <mavon-editor-render-client ref="MavonEditor" :value="blog.content" />
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
          <div class="p-s" style="top: 0">
            <el-scrollbar :native="false">
              <mavon-editor-toc :toc="toc" style="height: calc(100vh - 60px)"></mavon-editor-toc>
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
import MarkdownToc from '@/components/MarkdownToc.vue'
import PipeItemMixin from '@/pages/application/pipe/_components/PipeItemMixin.vue'
import MavonEditorRenderClient from '@/pages/application/_components/mavonEditor/MavonEditorRenderClient.vue'
import { BlogModel } from '@/types/model/Blog'
import MavonEditorToc from '@/pages/application/_components/mavonEditor/MavonEditorToc.vue'

@Component({
  components: { MavonEditorToc, MavonEditorRenderClient, MarkdownToc },
  async asyncData({ app, store }) {
    const item = store.state.pipe
    if (item.instruction) {
      const blog = await app.$axios.$get(`/v1/blog/${item.instruction}`)
      return { blog }
    }
  },
})
export default class Course extends PipeItemMixin {
  $refs!: {
    MavonEditor: MavonEditorRenderClient
  }
  blog: BlogModel | null = null
  toc: any[] = []
  mounted(): Promise<any> | void {
    this.$nextTick(() => {
      this.toc = this.$refs.MavonEditor?.getNavigation()
    })
  }
}
</script>
