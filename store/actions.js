const actions = {
  async logout({ commit }) {
    commit('CLEAR_USER_INFO')
    await this.$router.push('/login')
  },
}
export default actions
