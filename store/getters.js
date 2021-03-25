const getters = {
  username: (state) => state.auth.user?.uname,
  userId: (state) => state.auth.user?.uid,
}
export default getters
