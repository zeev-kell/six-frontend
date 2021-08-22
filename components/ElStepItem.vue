<template>
  <div class="item">
    <slot :onBlur="onBlur" />
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Prop, Vue, Watch } from 'nuxt-property-decorator'

function broadcast(componentName: any, eventName: any, params: any) {
  this.$children.forEach((child: any) => {
    const name = child.$options.componentName
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

@Component
export default class ElStepItem extends Vue {
  @InjectReactive('elForm')
  elForm!: any
  @InjectReactive('elFormItem')
  elFormItem!: any

  @Prop({ default: '' })
  value!: string

  @Watch('value')
  onWatchValue(val: any): void {
    this.dispatch('ElFormItem', 'el.form.change', [val])
  }

  onBlur(event: any) {
    this.$emit('blur', event)
    this.dispatch('ElFormItem', 'el.form.blur', [this.value])
  }
  dispatch(componentName: any, eventName: any, params: any) {
    let parent = this.$parent || this.$root
    let name = parent.$options.componentName
    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent
      if (parent) {
        name = parent.$options.componentName
      }
    }
    if (parent) {
      parent.$emit.apply(parent, [eventName].concat(params))
    }
  }
  broadcast(componentName: any, eventName: any, params: any) {
    broadcast.call(this as any, componentName, eventName, params)
  }
}
</script>
