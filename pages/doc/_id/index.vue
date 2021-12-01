<template>
  <div class="doc-container">
    <section class="header-banner el-row el-row--flex"></section>
    <section class="container">
      <h1 v-truncate="blog.title" class="title">{{ blog.title }}</h1>
      <p>
        <span v-for="tag of blog.tags" :key="tag.id">{{ tag.name }}</span>
        发布于 {{ blog.created_at }} {{ blog.provider }}
      </p>
      <el-container>
        <el-main class="main-container p-0">
          <div ref="markdown" v-html="markdown" />
          <el-image v-if="imageList.length !== 0" ref="elImage" style="width: 0; height: 0" :src="currentImage" :preview-src-list="imageList" />
        </el-main>
        <el-aside width="240px" class="toc-aside overflow-v">
          <client-only>
            <markdown-toc :toc="toc" />
          </client-only>
        </el-aside>
      </el-container>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MarkdownToc from '@/components/MarkdownToc.vue'
import { resourceHelp } from '@/utils/resource-help'
import { BlogModel } from '@/types/model/Blog'

@Component({
  layout: 'IndexLayoutBase',
  scrollToTop: true,
  components: { MarkdownToc },
  async asyncData({ app, params }) {
    const blog: BlogModel = await app.$api.blog.get(params.id)
    const { markdown, toc, imageList } = resourceHelp(blog.content)
    app.head.title = blog.title
    return { blog, markdown, toc, imageList }
  },
})
export default class DocIndex extends Vue {
  blog!: BlogModel
  markdown = null
  toc = []
  imageList = []
  currentImage = null
}
</script>

<style lang="scss" scoped>
.header-banner {
  background: url('/images/banner.jpg') no-repeat;
  background-size: cover;
  height: 250px;
  position: relative;
}
</style>
