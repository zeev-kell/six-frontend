<template>
  <div class="container-fluid p-20">
    <div class="el-row el-row--flex is-align-middle">
      <div class="el-col el-col-16 text-truncate mx-0">
        <h1 class="title">
          {{ blog.title }}
        </h1>
        <p>
          <strong class="mr-10">{{ blog.type | blogTypeTranslate | t({ prefix: 'constant.' }) }} </strong>
          <span class="mr-10">发布于 {{ blog.created_at }} {{ blog.provider }}</span>
        </p>
      </div>
      <div class="el-col el-col-8 text-right">
        <can-create>
          <nuxt-link v-slot="{ navigate }" :to="localePath('/application/doc/' + blog.id + '/edit')" custom>
            <el-button type="primary" icon="el-icon-edit" @click="navigate" @keypress.enter="navigate"> 编辑 </el-button>
          </nuxt-link>
        </can-create>
        <can-create v-if="blog.provider === username">
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete"> 删除 </el-button>
        </can-create>
      </div>
    </div>
    <hr />
    <div>
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
              <div style="position: sticky; top: 60px">
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
          <recommend-blog :blog="blog.previous"></recommend-blog>
          <recommend-blog :blog="blog.next" style="margin-top: 40px"></recommend-blog>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import CanCreate from '@/components/common/CanCreate.vue'
import CanExamine from '@/components/common/CanExamine.vue'
import MavonEditorRenderClient from '@/pages/application/_components/mavonEditor/MavonEditorRenderClient.vue'
import MavonEditorToc from '@/pages/application/_components/mavonEditor/MavonEditorToc.vue'
import DocIndexPage from '@/pages/doc/_id/index.vue'
import { blogConstants } from '@/constants/BlogConstants'
import RecommendBlog from '@/pages/doc/_id/_components/RecommendBlog.vue'

@Component({
  components: { RecommendBlog, MavonEditorToc, MavonEditorRenderClient, CanExamine, CanCreate },
  filters: {
    blogTypeTranslate: blogConstants.get,
  },
})
export default class DocIndex extends DocIndexPage {
  get username() {
    return this.$store.getters['user/username']
  }

  handleDelete(): Promise<any> {
    return this.$confirm('此操作将永久删除该文档, 是否继续?', '提示', {
      type: 'warning',
    }).then(() => {
      this.$api.blog.remove(this.$route.params.id).then(() => {
        this.$I18nRouter.push('/application/docs')
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 940px;
}
.main-container {
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>
