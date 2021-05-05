<template>
  <el-main style="max-width: 900px">
    <div v-marked="markdown"></div>
  </el-main>
</template>

<script type="text/babel">
  import marked from '@/directives/marked'
  import menus from '@/pages/support-center/menus'
  import axios from 'axios'
  const BLOG_URL = process.env.RESOURCES_URL + '/blog'
  export default {
    directives: {
      ...marked,
    },
    async asyncData({ params, redirect }) {
      const menu = menus.find((m) => m.key === params.id)
      if (!menu) {
        return redirect('/404')
      }
      const response = await axios.get(BLOG_URL + '/' + encodeURIComponent(menu.md))
      const markdown = response.data.replace(/(!\[.*?]\()img\//gi, (matchStr, subStr) => {
        // 替换图片的地址
        return subStr + BLOG_URL + '/img/'
      })
      return { markdown, title: menu.text }
    },
    data() {
      return {
        markdown: undefined,
      }
    },
  }
</script>
