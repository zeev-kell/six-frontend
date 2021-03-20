<template>
  <el-main>
    <h2>{{ markdown.title }}</h2>
    <div class="content" v-html="markdown.body"></div>
  </el-main>
</template>

<script type="text/babel">
  import menus from '@/pages/support-center/menus'
  export default {
    async asyncData({ app, params }) {
      const menu = menus.find((m) => m.key === params.id)
      // eslint-disable-next-line no-console
      console.log(process.env.BLOG_URL + menu.md)
      const markdown = await app.$axios.$get(process.env.BLOG_URL + menu.md)
      return { markdown }
    },
  }
</script>
