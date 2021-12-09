<template>
  <div class="doc-container">
    <section class="container mt-20">
      <el-image :src="bannerImage" fit="cover" :alt="blog.title">
        <div slot="placeholder" style="min-height: 200px">加载中...</div>
      </el-image>
    </section>
    <section class="container py-40">
      <h1 v-truncate="blog.title" class="title">{{ blog.title }}</h1>
      <p>
        <strong class="mr-10">{{ blog.type | blogTypeTranslate | t({ prefix: 'constant.' }) }} </strong>
        <span class="mr-10">发布于 {{ blog.created_at }} {{ blog.provider }}</span>
        <a class="pointer mr-10" @click="onCopyUrl">分享</a>
        <can-create>
          <nuxt-link :to="localePath('application-doc-new')">
            <el-button type="primary" plain>写文章<i class="feather icon-feather ml-5"></i> </el-button>
          </nuxt-link>
        </can-create>
      </p>
      <el-container>
        <el-main class="main-container">
          <mavon-editor-render-client ref="MavonEditor" v-model="blog.content"></mavon-editor-render-client>
        </el-main>
        <el-aside width="240px" class="toc-aside overflow-v">
          <client-only>
            <div class="p-s" style="top: 60px">
              <el-scrollbar :native="false">
                <mavon-editor-toc :toc="toc" style="height: calc(100vh - 80px)"></mavon-editor-toc>
              </el-scrollbar>
            </div>
          </client-only>
        </el-aside>
      </el-container>
      <p class="category">
        <el-tag v-for="category of blog.category" :key="category.id" class="mr-5" size="lg">{{ category.name }}</el-tag>
      </p>
      <div>
        <a class="pointer" @click="onCopyUrl">分享</a>
        转载请注明出处
      </div>
    </section>
    <section class="py-40" style="background: #f9f9f9">
      <div class="container">
        <h3 class="title mb-50">相关阅读</h3>
        <recommend-blog v-if="blog.id !== blog.previous.id" :blog="blog.previous"></recommend-blog>
        <recommend-blog v-if="blog.id !== blog.next.id" :blog="blog.next" style="margin-top: 40px"></recommend-blog>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { BlogModel } from '@/types/model/Blog'
import { Context } from '@nuxt/types'
import { copyText } from '@/directives/clipboard'
import { blogConstants } from '@/constants/BlogConstants'
import RecommendBlog from '@/pages/doc/_id/_components/RecommendBlog.vue'
import MavonEditorRenderClient from '@/pages/application/_components/mavonEditor/MavonEditorRenderClient.vue'
import MavonEditorToc from '@/pages/application/_components/mavonEditor/MavonEditorToc.vue'
import CanCreate from '@/components/common/CanCreate.vue'

@Component({
  layout: 'IndexLayout',
  scrollToTop: true,
  components: { CanCreate, MavonEditorToc, MavonEditorRenderClient, RecommendBlog },
  filters: {
    blogTypeTranslate: blogConstants.get,
  },
  async asyncData({ app, params }: Context) {
    const blog: BlogModel = await app.$api.blog.get(params.id)
    return { blog }
  },
})
export default class DocIndexPage extends Vue {
  $refs!: {
    MavonEditor: MavonEditorRenderClient
  }

  blog!: BlogModel
  toc: any[] = []

  onCopyUrl(): void {
    copyText(location.href).then(() => {
      this.$message.success('链接复制成功')
    })
  }
  get bannerImage(): string {
    return this.blog.image || '/images/banner.jpg'
  }

  mounted(): Promise<any> | void {
    this.$nextTick(() => {
      this.toc = this.$refs.MavonEditor.getNavigation()
    })
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
    margin-right: 10px;
    padding: 0 15px;
  }
}
</style>
