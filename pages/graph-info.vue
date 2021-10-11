<template>
  <nuxt-child />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  scrollToTop: true,
  middleware: ['auth'],
  head: {
    title: '可视化配置软件-六点了协作云',
    meta: [
      { hid: 'keywords', name: 'keywords', content: 'six-drager,可视化CWL,Common Workflow Language,sixoclock,六点了科技' },
      {
        hid: 'description',
        name: 'description',
        content: '六点了技术在流程协作模块为您提供了可视化，可编辑、可下载的数据处理工作流智能组合工具six-drager',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: '六点了技术在流程协作模块为您提供了可视化，可编辑、可下载的数据处理工作流智能组合工具six-drager',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
    ],
  },
})
export default class application extends Vue {}
</script>
