<template>
  <el-main class="main-container">
    <el-row type="flex">
      <el-col class="marked-content el-col-equal">
        <div ref="markdown" v-html="markdown" />
      </el-col>
      <el-col style="width: 260px">
        <client-only>
          <markdown-toc :toc="toc" />
        </client-only>
      </el-col>
    </el-row>
    <el-image v-if="imageList.length !== 0" ref="elImage" style="width: 0; height: 0" :src="currentImage" :preview-src-list="imageList" />
  </el-main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dMarked from '@/directives/marked'
import { resourceHelp } from '@/utils/resource-help'
import axios from 'axios'
const BLOG_URL = process.env.RESOURCES_URL + '/blog'

@Component({
  scrollToTop: true,
  components: {
    MarkdownToc: () => import('@/components/MarkdownToc.vue'),
  },
  directives: {
    marked: dMarked.marked,
  },
  async asyncData({ params, store }) {
    const helpMenus = store.state.helpMenus
    // TODO 修改 key 为可追溯的格式，可以直接找到对应的数据
    const helpMenusObj = helpMenus.reduce((obj: any, h: any) => {
      obj[h.key] = h
      if (h.children?.length) {
        h.children.forEach((c: any) => {
          obj[c.key] = c
        })
      }
      return obj
    }, {})
    const response = await axios.get(BLOG_URL + '/' + encodeURIComponent(helpMenusObj[params.id].md))
    const { markdown, toc, imageList } = resourceHelp(response.data)
    const currentImage = imageList[0] || undefined
    return { markdown, toc, imageList, currentImage }
  },
})
export default class IdPage extends Vue {
  $refs!: {
    elImage: HTMLFormElement
    markdown: HTMLFormElement
  }
  markdown = ''
  toc = []
  imageList = []
  currentImage = ''
  mounted() {
    this.$refs.markdown.querySelectorAll('img').forEach((el: HTMLImageElement) => {
      el.addEventListener('click', () => {
        this.currentImage = el.src
        this.$refs.elImage.clickHandler()
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  width: calc(100% - 240px);
  overflow: inherit;
}
</style>
