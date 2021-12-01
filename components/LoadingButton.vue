<template>
  <el-button v-bind="$attrs" :loading="loading" v-on="$listeners" @click="onClick">
    <slot />
  </el-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class LoadingButton extends Vue {
  @Prop({ required: true })
  callback!: ($event: Event, ...args: string[]) => Promise<void>
  @Prop({
    default() {
      return []
    },
  })
  args!: string[]
  @Prop({
    required: false,
    default() {
      return false
    },
  })
  event!: boolean

  loading = false

  onClick($event: Event): void {
    if (!this.loading) {
      this.loading = true
      const args: any = [...this.args]
      if (this.event) {
        args.unshift($event)
      }
      this.callback
        .apply(null, args)
        .finally(() => {
          this.loading = false
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log(e)
          return Promise.reject(e)
        })
    }
  }
}
</script>
