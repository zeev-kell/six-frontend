import axios from 'axios'
export default async function ({ store }) {
  if (!store.state.helpMenus?.length) {
    const BLOG_URL = process.env.RESOURCES_URL + '/blog'
    const response = await axios.get(BLOG_URL + '/nav.json')
    store.commit('SET_HELP_MENUS', response.data)
  }
}
