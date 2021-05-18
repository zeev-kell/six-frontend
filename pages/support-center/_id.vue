<template>
  <el-main class="main-container">
    <el-row type="flex">
      <el-col :span="20" class="marked-content">
        <div v-html="markdown"></div>
      </el-col>
      <el-col style="width: 260px">
        <client-only>
          <markdown-toc :toc="toc"></markdown-toc>
        </client-only>
      </el-col>
    </el-row>
  </el-main>
</template>

<script type="text/babel">
  import dMarked from '@/directives/marked'
  import axios from 'axios'
  const BLOG_URL = process.env.RESOURCES_URL + '/blog'
  export default {
    scrollToTop: true,
    components: {
      MarkdownToc: () => import('@/pages/support-center/_components/MarkdownToc'),
    },
    directives: {
      marked: dMarked.marked,
    },
    async asyncData({ params, store }) {
      const helpMenus = store.state.helpMenus
      // TODO 修改 key 为可追溯的格式，可以直接找到对应的数据
      const helpMenusObj = helpMenus.reduce((obj, h) => {
        obj[h.key] = h
        if (h.children?.length) {
          h.children.forEach((c) => {
            obj[c.key] = c
          })
        }
        return obj
      }, {})
      const response = await axios.get(BLOG_URL + '/' + encodeURIComponent(helpMenusObj[params.id].md))
      const str = response.data.replace(/(!\[.*?]\()img\//gi, (matchStr, subStr) => {
        // 替换图片的地址
        return subStr + BLOG_URL + '/img/'
      })
      const [markdown, toc] = dMarked.$getTocObj(str)
      return { markdown, toc }
    },
    data() {
      return {
        markdown: undefined,
        toc: [],
      }
    },
  }
</script>

<style lang="scss" scoped>
  .main-container {
    width: calc(100% - 240px);
    overflow: inherit;
  }
</style>
