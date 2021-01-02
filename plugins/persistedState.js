import cookie from 'cookie'
import Cookies from 'js-cookie'
import createPersistedState from 'vuex-persistedstate'
// TODO 后期优化

export default ({ store, req }) => {
  createPersistedState({
    // 代替 getState 和 setState
    storage: {
      getItem: (key) => {
        // See https://nuxtjs.org/guide/plugins/#using-process-flags
        if (process.server) {
          if (!req.headers.cookie) {
            return null
          }
          const parsedCookies = cookie.parse(req.headers.cookie)
          return parsedCookies[key]
        } else {
          return Cookies.get(key)
        }
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) => {
        return Cookies.set(key, value, { expires: 365, secure: false })
      },
      removeItem: (key) => {
        return Cookies.remove(key)
      },
    },
  })(store)
}
