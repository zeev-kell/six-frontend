const getters = {
  username: (state) => state.auth?.user?.uname,
  userId: (state) => state.auth?.user?.uid,
  loggedIn: (state) => state.auth.loggedIn,
}
export default getters
