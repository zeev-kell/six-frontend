const actions = {
  logout({ commit }) {
    return this.$axios
      .$get('/logout')
      .then(async () => {
        commit('CLEAR_USER_INFO')
        await this.$router.push('/login')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
      })
  },
}
export default actions
