/**
 * Created by keziyuan on 2021/6/27 1:48.
 */
export default function ({ $auth, app }) {
  $auth.onRedirect(function (to, from) {
    // eslint-disable-next-line no-console
    console.log(22222222222222222222)
    const _from = app.localePath(from)
    const _to = app.localePath(to)
    // eslint-disable-next-line no-console
    console.log(_from, _to)
    // eslint-disable-next-line no-console
    console.log(from, to)
    return to
  })
}
