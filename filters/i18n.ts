import Vue from 'vue'

function t(this: any, key: number | string): string {
  return this.$i18n.t(key) as string
}

Vue.filter('t', t)
