<template>
  <div>GraphTool</div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'
import { CommandLineToolFactory } from 'cwlts/models'
import GraphMixin from '@/pages/_components/Graph/GraphMixin.vue'
import { CommandLineTool } from 'cwlts/mappings/v1.0/CommandLineTool'

@Component
export default class GraphTool extends GraphMixin {
  createModel(json: CommandLineTool): void {
    this.dataModel = CommandLineToolFactory.from(json, 'document')
  }
}
</script>
