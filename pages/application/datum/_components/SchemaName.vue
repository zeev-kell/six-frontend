<template>
  <div>
    <span v-if="loading" class="el-icon-loading ml-10"> </span>
    <span v-else>
      <nuxt-link v-slot="{ href }" class="text-truncate" :to="localePath('/application/datum/' + schema)" :title="schemaName" custom>
        <a class="el-link el-link--default" target="_blank" :href="href">{{ schemaName }} </a>
      </nuxt-link>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Prop } from 'vue-property-decorator'

@Component
export default class SchemaName extends Vue {
  @Prop({ required: true })
  schema!: string
  loading = false
  schemaName = ''
  @Watch('schema', { immediate: true })
  async onWatchSchema(value: string): Promise<void> {
    if (!value) {
      return
    }
    this.loading = true
    const item = await this.$api.datum.get(value).finally(() => (this.loading = false))
    this.schemaName = item.name
  }
}
</script>
