<template>
  <div class="container-fluid" style="overflow: inherit">
    <mavon-editor-render-client v-if="item.instruction" v-model="item.instruction" />
    <div v-else>暂无使用教程</div>
  </div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import MavonEditorRenderClient from '@/pages/application/_components/mavonEditor/MavonEditorRenderClient.vue'
import CaseItemMixin from '@/pages/application/case/_components/CaseItemMixin.vue'

@Component({
  components: { MavonEditorRenderClient },
})
export default class Course extends CaseItemMixin {}
</script>
