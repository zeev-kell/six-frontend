import Vue from 'vue'

const files = require.context('~/components/common', false, /\.vue$/i)
files.keys().map((key) => {
  return Vue.component(key.split('/').pop().split('.')[0], files(key).default)
})
