<template>
  <el-main>
    <div v-marked="markdown" class="content"></div>
  </el-main>
</template>

<script type="text/babel">
  import marked from '@/directives/marked'
  import menus from '@/pages/support-center/menus'
  import axios from 'axios'
  export default {
    directives: {
      ...marked,
    },
    async asyncData({ params }) {
      const menu = menus.find((m) => m.key === params.id)
      const response = await axios.get(process.env.BLOG_URL + encodeURIComponent(menu.md))
      return { markdown: response.data, title: menu.text }
    },
  }
</script>
