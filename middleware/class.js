export default function ({ store, route }) {
  store.commit('SET_BODY_CLASS', route.name)
}
