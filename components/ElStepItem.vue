<template>
  <div class="item">
    <slot :onBlur="onBlur" />
  </div>
</template>

<script lang="ts">
import { Component, InjectReactive, Prop, Vue, Watch } from 'nuxt-property-decorator'

function broadcast(this: any, componentName: any, eventName: any, params: any): void {
  this.$children.forEach((child: any) => {
    const name: any = child.$options.componentName
    if (name === componentName) {
      child.$emit.apply(child, ([eventName] as any).concat(params))
    } else {
      broadcast.apply(child, ([componentName, eventName] as any).concat([params]))
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
    let parent: any = this.$parent || this.$root
    let name = parent.$options.componentName
    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent
      if (parent) {
        name = parent.$options.componentName
      }
    }
    if (parent) {
      parent.$emit.apply(parent, ([eventName] as any).concat(params))
    }
  }
  broadcast(componentName: any, eventName: any, params: any) {
    broadcast.call(this as any, componentName, eventName, params)
  }
}
</script>
