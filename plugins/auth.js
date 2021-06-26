/**
 * Created by keziyuan on 2021/6/27 1:48.
 */
export default function ({ $auth, i18n }) {
  $auth.onRedirect(function (to) {
    const local = i18n.getLocaleCookie()
    // 如果是默认的语言，不需要修改
    if (local === i18n.defaultLocale) {
      return to
    }
    const lang = `/${local}`
    // 这里做了容错，判断是否已经是语言的前缀
    return to.startsWith(lang) ? to : lang + to
  })
}
