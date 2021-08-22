<template>
  <graph-index ref="graphIndex" class="h-100v" :item="item" config-type="run" tools="download|plus,minus,fit" @propagate-event="onPropagate" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GraphIndex from '@/pages/_components/Graph/GraphIndex.vue'
import { GraphEvent } from '@/constants/GraphEvent'
import { getObject } from '@/pages/_components/Graph/helpers/YamlHandle'

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
    graphIndex: GraphIndex
  }

  item: any = null
  profile: any = null

  onPropagate(eventName: string): void {
    // TODO 修改为事件
    //  监听第一次实例化事件
    if (GraphEvent.TriggerPageModalCreate === eventName) {
      const profile = this.profile
      if (profile?.content) {
        const job = getObject(profile.content)
        this.$nextTick(() => {
          this.$refs.graphIndex.dispatchAction('updateJob', job)
        })
      }
    }
  }
}
</script>
