/**
 * Created by keziyuan on 2021/6/27 17:02.
 */
import Vue from 'vue'

function t(key) {
  return this.$i18n.t(key)
}

Vue.filter('t', t)
