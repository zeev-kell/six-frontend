import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/locales/en'
import zh from '@/locales/zh'

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale || 'zh',
    fallbackLocale: 'zh', // 我这里默认语言为中文
    messages: {
      en,
      zh,
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
