<template>
  <nuxt-child />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

const description =
  '六点了协作云是一个提供可重用、模块化、可视化生物医疗数据处理算法的云协作平台，' +
  '你可以快速获取可靠的数据处理软件、流程，并通过在线的可视化参数配置界面完成软件参数的设置、软件的下载，' +
  '利用本地计算设备，完成一键下载，一键运行。'

@Component({
  scrollToTop: true,
  layout: 'AppLayout',
  head: {
    title: '六点了协作云',
    meta: [
      { hid: 'keywords', name: 'keywords', content: 'sixoclock,六点了协作云,六点了科技,基因数据云服务,CWL' },
      { hid: 'description', name: 'description', content: description },
    ],
  },
})
export default class ApplicationPage extends Vue {}
</script>
