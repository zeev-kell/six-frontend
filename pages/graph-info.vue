<template>
  <nuxt-child />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

const description =
  'six-drager提供可视化，可编辑、可下载的交互式数据处理工作流智能组合工具，' +
  '基于应用仓库已有工具，以模块化、可视化拖拽组合的方式使用、配置，以及设计生成个性化分析计算流程。'

@Component({
  scrollToTop: true,
  middleware: ['auth'],
  head: {
    title: '流程协作—six-drager-流程可视化组合工具',
    meta: [
      { hid: 'keywords', name: 'keywords', content: 'six-drager,可视化流程组合,CWL,Common Workflow Language,sixoclock,六点了科技' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'og:description', name: 'og:description', content: description },
      { hid: 'og:product', property: 'og:product', content: 'six-drager' },
    ],
  },
})
export default class application extends Vue {}
</script>
