<template>
  <el-button v-bind="$attrs" @click="navigate" @keypress.enter="navigate">
    <slot></slot>
  </el-button>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ToggleEditInfo extends Vue {
  navigate(): void {
    const name = this.getRouteBaseName() || ''
    let newName = name.replace(/-index|-edit/, (k) => {
      return k === '-index' ? '-edit' : '-index'
    })
    if (newName.endsWith('-setting')) {
      newName = newName.substring(0, newName.length - 8)
    }
    this.$I18nRouter.push({
      name: newName,
      params: this.$route.params,
      query: this.$route.query,
    })
  }
}
</script>
