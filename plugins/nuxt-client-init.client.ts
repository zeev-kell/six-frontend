import { Plugin, Context } from '@nuxt/types'

const nuxtClientInitPlugin: Plugin = async (context: Context) => {
  await context.store.dispatch('nuxtClientInit', context)
}

export default nuxtClientInitPlugin
