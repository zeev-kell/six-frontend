<template>
  <graph-workflow-edit></graph-workflow-edit>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GraphWorkflowEdit from '@/pages/_components/Graph/GraphWorkflowEdit.vue'

@Component({
  components: { GraphWorkflowEdit },
})
export default class GraphInfoNew extends Vue {}
</script>
