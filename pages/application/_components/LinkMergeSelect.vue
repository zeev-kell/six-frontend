<template>
  <select v-model="actualValue" class="form-control" :disabled="readonly">
    <option value="">-- none --</option>
    <option value="merge_nested">Nested</option>
    <option value="merge_flattened">Flattened</option>
  </select>
</template>

<script type="text/babel">
  export default {
    name: 'LinkMergeSelect',
    props: {
      // eslint-disable-next-line vue/require-prop-types
      value: {
        default: undefined,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      actualValue: {
        get() {
          return this.value === null || this.value === undefined ? '' : this.value
        },
        set(value) {
          this.$emit('update', value)
        },
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet"></style>
