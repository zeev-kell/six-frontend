const actions = {
  logout({ commit }) {
    return this.$axios.$get('/logout').finally(async () => {
      commit('CLEAR_USER_INFO')
      await this.$router.push('/login')
    })
  },
}
export default actions
