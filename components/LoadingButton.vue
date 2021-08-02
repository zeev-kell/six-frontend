<template>
  <el-button v-bind="$attrs" :loading="loading" v-on="$listeners" @click="onClick">
    <slot></slot>
  </el-button>
</template>
<script type="text/babel">
export default {
  name: 'LoadingButton',
  props: {
    callback: {
      type: Function,
      required: true,
    },
    args: {
      type: Array,
      required: false,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    onClick($event) {
      if (!this.loading) {
        this.loading = true
        this.callback($event, ...this.args)
          .finally(() => {
            this.loading = false
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.log(e)
            return Promise.reject(e)
          })
      }
    },
  },
}
</script>
