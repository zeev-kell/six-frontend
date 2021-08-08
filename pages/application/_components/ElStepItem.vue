<template>
  <div class="item">
    <slot :onBlur="onBlur" />
  </div>
</template>

<script type="text/babel">
import emitter from 'element-ui/src/mixins/emitter'

export default {
  name: 'ElStepItem',
  mixins: [emitter],
  inject: {
    elForm: {
      default: '',
    },
    elFormItem: {
      default: '',
    },
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: '',
    },
  },
  watch: {
    value(val) {
      this.dispatch('ElFormItem', 'el.form.change', [val])
    },
  },
  methods: {
    onBlur(event) {
      this.$emit('blur', event)
      this.dispatch('ElFormItem', 'el.form.blur', [this.value])
    },
  },
}
</script>
