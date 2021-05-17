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
    components: {
      MarkdownToc: () => import('@/pages/_components/markdown-toc'),
    },
    directives: {
      marked: dMarked.marked,
    },
    async asyncData({ params, store }) {
      console.log(11111111111111111)
      const helpMenus = store.state.helpMenus
      const helpMenusObj = helpMenus.reduce((obj, h) => {
        obj[h.key] = h
        if (h.children?.length) {
          h.children.forEach((c) => {
            obj[c.key] = c
          })
        }
        return obj
      }, {})
      const response = await axios.get(BLOG_URL + '/' + helpMenusObj[params.id].md)
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
