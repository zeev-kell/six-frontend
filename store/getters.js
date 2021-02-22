const getters = {
  username: (state) => state.token?.uname,
  userId: (state) => state.token?.uid,
}
export default getters
