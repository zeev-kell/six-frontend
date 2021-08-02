<template>
  <div class="container-fluid p-20">
    <div class="el-row el-row--flex is-align-middle">
      <div class="el-col el-col-16 text-truncate mx-0">
        <h1 class="title">
          {{ blog.title }}
        </h1>
        <p class="caption">发布于 {{ blog.created_at }}</p>
      </div>
      <div class="el-col el-col-8 text-right">
        <can-create>
          <nuxt-link v-slot="{ navigate }" :to="localePath('/application/doc/' + blog.id + '/edit')" custom>
            <el-button type="primary" icon="el-icon-edit" @click="navigate" @keypress.enter="navigate">编辑</el-button>
          </nuxt-link>
        </can-create>
        <can-examine>
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
        </can-examine>
      </div>
    </div>
    <el-container>
      <el-main class="main-container">
        <div ref="markdown" v-html="markdown"></div>
        <el-image v-if="imageList.length !== 0" ref="elImage" style="width: 0; height: 0" :src="currentImage" :preview-src-list="imageList">
        </el-image>
      </el-main>
      <el-aside width="240px" class="toc-aside">
        <div class="card">
          <div class="card-header el-row el-row--flex is-align-middle py-5">
            <h4>作者</h4>
          </div>
          <div class="card-body">
            <div style="font-weight: 600; margin-bottom: 10px">{{ blog.provider }}</div>
          </div>
        </div>
        <client-only>
          <markdown-toc :toc="toc"></markdown-toc>
        </client-only>
      </el-aside>
    </el-container>
  </div>
</template>

<script type="text/babel">
import MarkdownToc from '@/pages/support-center/_components/MarkdownToc'
import { resourceHelp } from '@/utils/resource-help'

export default {
  components: { MarkdownToc },
  async asyncData({ app, params }) {
    const blog = await app.$axios.$get(`/v1/blog/${params.id}`)
    const { markdown, toc, imageList } = resourceHelp(blog.content)
    return { blog, markdown, toc, imageList }
  },
  data() {
    return {
      blog: {},
      markdown: undefined,
      toc: [],
      imageList: [],
      currentImage: undefined,
    }
  },
  methods: {
    handleDelete() {},
  },
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
