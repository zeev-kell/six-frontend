<template>
  <graph-index ref="graph" class="h-100v" :item="item" config-type="run" tools="download|plus,minus,fit" @trigger-modal-create="onModalCreate" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { GraphEvent } from '@/constants/GraphEvent'
import GraphIndex from '@/pages/application/_components/graph/GraphIndex.vue'
import { getObject } from '@/pages/application/_components/graph/helpers/YamlHandle'

@Component({
  components: { GraphIndex },
  async asyncData({ app, params, query }) {
    const item = await app.$axios.$get(`/v2/pipe/${params.id}`)
    const profileId = query.profile ?? item.profile
    if (profileId) {
      const profile = await app.$axios.$get(`/v2/pipe/${profileId}`)
      return { item, profile }
    }
    return { item }
  },
})
export default class SetRunPage extends Vue {
  $refs!: {
    graph: HTMLFormElement
  }
  item: any = null
  profile: any = null

  onModalCreate() {
    const profile = this.profile
    if (profile?.content) {
      this.updateGraphJob()
    }
  }

  updateGraphJob() {
    const job = getObject(this.profile.content)
    this.$nextTick(() => {
      this.$refs.graph.$emit(GraphEvent.Dispatch, GraphEvent.PayloadUpdateJob, job)
    })
  }
}
</script>
