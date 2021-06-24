<template>
  <el-main class="main-container" style="overflow: inherit">
    <el-row type="flex">
      <el-col class="marked-content el-col-equal">
        <div ref="markdown" v-html="markdown"></div>
      </el-col>
      <el-col style="width: 260px">
        <client-only>
          <markdown-toc :toc="toc"></markdown-toc>
        </client-only>
      </el-col>
    </el-row>
    <el-image ref="elImage" style="width: 0; height: 0" :src="currentImage" :preview-src-list="imageList"> </el-image>
  </el-main>
</template>

<script type="text/babel">
import MarkdownToc from '@/pages/support-center/_components/MarkdownToc'
import { resourceHelp } from '@/utils/resource-help'

export default {
  components: { MarkdownToc },
  async asyncData({ app, params, store, redirect }) {
    const item = store.state.pipe
    if (item.instruction) {
      const instruction = await app.$axios.$get(`/v1/blog/${params.id}`)
      const { markdown, toc, imageList } = resourceHelp(instruction.content)
      return { instruction, markdown, toc, imageList }
    } else {
      redirect(`/application/pipe/${params.id}`)
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

<style lang="scss"></style>
