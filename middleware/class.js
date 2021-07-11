export default function ({ store, route }) {
  store.commit('SET_BODY_CLASS', route.name)
  if (process.client && document.documentElement.clientWidth <= 991) {
    store.commit('SET_MOBILE')
  }
}
