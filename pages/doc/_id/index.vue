<template>
  <div class="doc-container">
    <section class="header-banner el-row el-row--flex"></section>
    <section class="container py-40">
      <h1 v-truncate="blog.title" class="title">{{ blog.title }}</h1>
      <p>
        {{ blog.type | blogTypeTranslate | t({ prefix: 'constant.' }) }} 发布于 {{ blog.created_at }} {{ blog.provider }}
        <a class="pointer" @click="onCopyUrl">分享</a>
      </p>
      <el-container>
        <el-main class="main-container">
          <div ref="markdown" v-html="markdown" />
          <el-image v-if="imageList.length !== 0" ref="elImage" style="width: 0; height: 0" :src="currentImage" :preview-src-list="imageList" />
        </el-main>
        <el-aside width="240px" class="toc-aside overflow-v">
          <client-only>
            <markdown-toc :toc="toc" />
          </client-only>
        </el-aside>
      </el-container>
      <div>
        <a class="pointer" @click="onCopyUrl"> <i class="el-icon-share"></i>分享</a>
        <span v-for="tag of blog.tags" :key="tag.id">{{ tag.name }}</span>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MarkdownToc from '@/components/MarkdownToc.vue'
import { resourceHelp } from '@/utils/resource-help'
import { BlogModel } from '@/types/model/Blog'
import { Context } from '@nuxt/types'
import { copyText } from '@/directives/clipboard'
import { blogConstants } from '@/constants/BlogConstants'

@Component({
  layout: 'IndexLayoutBase',
  scrollToTop: true,
  components: { MarkdownToc },
  filters: {
    blogTypeTranslate: blogConstants.get,
  },
  async asyncData({ app, params }: Context) {
    const blog: BlogModel = await app.$api.blog.get(params.id)
    const { markdown, toc, imageList } = resourceHelp(blog.content)
    return { blog, markdown, toc, imageList }
  },
})
export default class DocIndexPage extends Vue {
  blog!: BlogModel
  markdown = null
  toc = []
  imageList = []
  currentImage = null
  onCopyUrl(): void {
    copyText(location.href).then(() => {
      this.$message.success('链接复制成功')
    })
  }
}
</script>

<style lang="scss" scoped>
.header-banner {
  background: url('/images/banner.jpg') no-repeat;
  background-size: cover;
  height: 250px;
  position: relative;
}
.main-container {
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>
