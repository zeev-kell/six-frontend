const getters = {
  username: (state) => state.auth?.user?.uname,
  userId: (state) => state.auth?.user?.uid,
  loggedIn: (state) => state.auth.loggedIn,
  role: (state) => state.auth.user.admin,
  permissions: (state) => state.auth.user.permissions,
}
export default getters
