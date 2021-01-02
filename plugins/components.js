import Vue from 'vue'

const components = []
for (const c of components) {
  Vue.component(c.name, c)
}
