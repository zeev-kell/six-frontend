<template>
  <graph-index ref="graph" class="h-100v" :item="item" config-type="run" tools="download|plus,minus,fit" @trigger-modal-create="onModalCreate" />
</template>

<script type="text/babel">
import { GraphEvent } from '@/constants/GraphEvent'
import GraphIndex from '@/pages/application/_components/graph/GraphIndex'
import { getObject } from '@/pages/application/_components/graph/helpers/YamlHandle'
export default {
  components: { GraphIndex },
  async asyncData({ app, params }) {
    const item = await app.$axios.$get(`/v2/pipe/${params.id}`)
    const profileId = item.profile
    if (profileId) {
      const profile = await app.$axios.$get(`/v2/pipe/${profileId}`)
      return { item, profile }
    }
    return { item }
  },
  data() {
    return {
      item: undefined,
      profile: undefined,
    }
  },
  methods: {
    onModalCreate() {
      const profile = this.profile
      if (profile?.content) {
        this.updateGraphJob()
      }
    },
    updateGraphJob() {
      const job = getObject(this.profile.content)
      this.$nextTick(() => {
        this.$refs.graph.$emit(GraphEvent.Dispatch, GraphEvent.PayloadUpdateJob, job)
      })
    },
  },
}
</script>
