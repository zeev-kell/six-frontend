import { Plugin } from '@nuxt/types'

const DEFAULT_RESPONSE = { status: 500, msg: '服务器异常' }

const AxiosPlugin: Plugin = ({ $axios, store }) => {
  $axios.onRequest((config) => {
    return config
  })
  $axios.onRequestError((error) => {
    // eslint-disable-next-line no-console
    console.log('onRequestError', error)
  })
  $axios.onResponse((response) => {
    if (process.client) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-undef,no-console
        console.log(response)
      }
    } else {
      // eslint-disable-next-line no-undef,no-console
      console.log(response.config.url)
    }
    // $get $post 等，直接返回 data 对象
    return response
  })
  $axios.onResponseError(async (error) => {
    // eslint-disable-next-line no-console
    console.log('onResponseError', error)
    if (!error.response || !error.response.status) {
      return Promise.reject(DEFAULT_RESPONSE)
    }
    if (error.response.status === 401) {
      // eslint-disable-next-line no-console
      console.error(error.response.config?.url)
      if (error.response.config?.url !== '/logout') {
        await store.dispatch('logout')
      }
    }
    return Promise.reject(error.response.data || {})
  })
  // $axios.onError(() => {})}
}

export default AxiosPlugin