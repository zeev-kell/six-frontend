import { Plugin, Context } from '@nuxt/types'

const AuthPlugin: Plugin = ({ $auth, i18n }: Context) => {
  $auth.onRedirect(function (to) {
    const local = i18n.getLocaleCookie() || 'zh'
    // 如果是默认的语言，不需要修改
    if (local === undefined || local === i18n.defaultLocale) {
      return to
    }
    const lang = `/${local}`
    // 这里做了容错，判断是否已经是语言的前缀
    return to.startsWith(lang) ? to : lang + to
  })
}

export default AuthPlugin
