export default function ({ store, redirect, query }) {
  if (store.$auth?.loggedIn) {
    // const ref = new RegExp('(^|[&?])ref=([^&]*)(&|$)', 'i')
    const redirectURL = query.ref || '/application'
    redirect(301, redirectURL)
  }
}
