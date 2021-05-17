import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale || 'zh',
    fallbackLocale: 'zh', // 我这里默认语言为中文
    messages: {
      en: require('@/locales/en.js'),
      zh: require('@/locales/zh.js'),
    },
  })
  app.i18n.path = (link) => {
    // 如果是默认语言，就省略
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }
    return `/${app.i18n.locale}/${link}`
  }
}
