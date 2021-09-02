import Vue from 'vue'

const files = (require as any).context('~/components/common', false, /\.vue$/i)
files.keys().map((key: string) => {
  return Vue.component(key.split('/').pop()!.split('.')[0], files(key).default)
})
