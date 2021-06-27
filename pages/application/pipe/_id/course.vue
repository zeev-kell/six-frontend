<template>
  <div class="container-fluid" style="overflow: inherit">
    <el-row v-if="item.instruction" type="flex">
      <el-col class="marked-content el-col-equal">
        <div ref="markdown" v-html="markdown"></div>
      </el-col>
      <el-col style="width: 260px">
        <div class="panel">
          <div class="panel-header el-row el-row--flex is-align-middle py-5">
            <h4>引用自</h4>
          </div>
          <div class="panel-body">
            <div style="font-weight: 600; margin-bottom: 10px">知识库文档</div>
            {{ item.instruction }}
          </div>
        </div>
        <client-only>
          <markdown-toc :toc="toc"></markdown-toc>
        </client-only>
      </el-col>
    </el-row>
    <div v-else>暂无使用教程</div>
    <el-image v-if="imageList.length === 0" ref="elImage" style="width: 0; height: 0" :src="currentImage" :preview-src-list="imageList"> </el-image>
  </div>
</template>

<script type="text/babel">
import MarkdownToc from '@/pages/support-center/_components/MarkdownToc'
import { resourceHelp } from '@/utils/resource-help'

export default {
  components: { MarkdownToc },
  async asyncData({ app, store }) {
    const item = store.state.pipe
    if (item.instruction) {
      const instruction = await app.$axios.$get(`/v1/blog/${item.instruction}`)
      const { markdown, toc, imageList } = resourceHelp(instruction.content)
      return { instruction, markdown, toc, imageList }
    } else {
      return {}
    }
  },
  data() {
    return {
      markdown: undefined,
      toc: [],
      imageList: [],
      currentImage: undefined,
    }
  },
  computed: {
    item() {
      return this.$store.state.pipe
    },
  },
}
</script>
