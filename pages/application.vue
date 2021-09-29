<template>
  <nuxt-child />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  scrollToTop: true,
  layout: 'AppLayout',
  head: {
    title: '六点了科技',
    meta: [
      { hid: 'keywords', name: 'keywords', content: 'sixoclock,六点了科技,基因数据云服务,CWL' },
      {
        hid: 'description',
        name: 'description',
        content: 'Sixbox 是运行sixoclock软件仓库的本地桌面软件，提供可视化选择软件与配置文件并一键本地运行功能。',
      },
    ],
  },
})
export default class application extends Vue {}
</script>
