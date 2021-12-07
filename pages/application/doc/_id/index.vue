<template>
  <div class="container-fluid p-20">
    <div class="el-row el-row--flex is-align-middle">
      <div class="el-col el-col-16 text-truncate mx-0">
        <h1 class="title">
          {{ blog.title }}
        </h1>
        <p class="caption">
          <span class="mr-5">{{ blog.type | blogTypeTranslate | t({ prefix: 'constant.' }) }} </span>
          <span class="mr-5">发布于 {{ blog.created_at }} {{ blog.provider }}</span>
        </p>
      </div>
      <div class="el-col el-col-8 text-right">
        <can-create>
          <nuxt-link v-slot="{ navigate }" :to="localePath('/application/doc/' + blog.id + '/edit')" custom>
            <el-button type="primary" icon="el-icon-edit" @click="navigate" @keypress.enter="navigate"> 编辑 </el-button>
          </nuxt-link>
        </can-create>
        <can-create>
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete"> 删除 </el-button>
        </can-create>
      </div>
    </div>
    <el-container>
      <el-main class="main-container">
        <div ref="markdown" v-html="markdown" />
        <el-image v-if="imageList.length !== 0" ref="elImage" style="width: 0; height: 0" :src="currentImage" :preview-src-list="imageList" />
      </el-main>
      <el-aside width="240px" class="toc-aside">
        <client-only>
          <markdown-toc :toc="toc" />
        </client-only>
      </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MarkdownToc from '@/components/MarkdownToc.vue'
import { resourceHelp } from '@/utils/resource-help'
import CanCreate from '@/components/common/CanCreate.vue'
import CanExamine from '@/components/common/CanExamine.vue'
import { blogConstants } from '@/constants/BlogConstants'

@Component({
  components: { CanExamine, CanCreate, MarkdownToc },
  filters: {
    blogTypeTranslate: blogConstants.get,
  },
  async asyncData({ app, params }) {
    const blog = await app.$axios.$get(`/v1/blog/${params.id}`)
    const { markdown, toc, imageList } = resourceHelp(blog.content)
    return { blog, markdown, toc, imageList }
  },
})
export default class DocIndex extends Vue {
  blog = {}
  markdown = null
  toc = []
  imageList = []
  currentImage = null

  handleDelete() {}
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}

.aside-wrap {
  position: sticky;
  height: 100%;
  top: 60px;
  padding: 20px 0;
}

.caption {
  padding: 5px 0 0;
  background-color: #ffffff;
  color: #666666;
  font-size: 16px;
  line-height: 30.0001px;
  text-align: justify;
  letter-spacing: normal;
}
</style>
