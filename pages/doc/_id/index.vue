<template>
  <div class="doc-container">
    <section class="container mt-20">
      <el-image :src="bannerImage" fit="cover" :alt="blog.title"></el-image>
    </section>
    <section class="container py-40">
      <h1 v-truncate="blog.title" class="title">{{ blog.title }}</h1>
      <p>
        <span class="mr-5">{{ blog.type | blogTypeTranslate | t({ prefix: 'constant.' }) }} </span>
        <span class="mr-5">发布于 {{ blog.created_at }} {{ blog.provider }}</span>
        <a class="pointer" @click="onCopyUrl">分享</a>
      </p>
      <el-container>
        <el-main class="main-container">
          <mavon-editor-render-client ref="MavonEditor" v-model="blog.content"></mavon-editor-render-client>
        </el-main>
        <el-aside width="240px" class="toc-aside overflow-v">
          <client-only>
            {{ navigation }}
            <markdown-toc :toc="toc" />
          </client-only>
        </el-aside>
      </el-container>
      <p class="category">
        <el-tag v-for="category of blog.category" :key="category.id" class="mr-5">{{ category.name }}</el-tag>
      </p>
      <div>
        <a class="pointer" @click="onCopyUrl">分享</a>
      </div>
    </section>
    <section class="py-40" style="background: #f9f9f9">
      <div class="container">
        <h3 class="title mb-50">相关阅读</h3>
        <recommend-blog :blog="blog.previous"></recommend-blog>
        <recommend-blog :blog="blog.next" style="margin-top: 40px"></recommend-blog>
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
import RecommendBlog from '@/pages/doc/_id/_components/RecommendBlog.vue'
import MavonEditorRenderClient from '@/pages/application/_components/mavonEditor/MavonEditorRenderClient.vue'

@Component({
  layout: 'IndexLayout',
  scrollToTop: true,
  components: { MavonEditorRenderClient, RecommendBlog, MarkdownToc },
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
  $refs!: {
    MavonEditor: MavonEditorRenderClient
  }

  blog!: BlogModel
  markdown = null
  toc = []
  currentImage = null

  onCopyUrl(): void {
    copyText(location.href).then(() => {
      this.$message.success('链接复制成功')
    })
  }
  get bannerImage(): string {
    return this.blog.image || '/images/banner.jpg'
  }
  get navigation(): string {
    return ''
  }
}
</script>

<style lang="scss" scoped>
.doc-container {
  padding-top: 60px;
}
.container {
  width: 940px;
}
.main-container {
  padding: 0;
  margin: 0;
  height: 100%;
}
.category {
  .el-tag {
    border-radius: 100px;
  }
}
</style>
