const DEFAULT_RESPONSE = { status: 500, msg: '服务器异常' }
export default function ({ $axios, store }) {
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
    console.log('onResponseError', error.response)
    if (!error.response || !error.response.status) {
      return Promise.reject(DEFAULT_RESPONSE)
    }
    if (error.response.status === 401) {
      alert(JSON.stringify(error.response))
      // eslint-disable-next-line no-console
      console.error(error.response.config?.url)
      if (error.response.config?.url !== '/logout') {
        await store.dispatch('logout')
      }
    }
    const res = {
      status: error.response.status,
      statusCode: error.response.status,
      ...(error.response.data || {}),
    }
    return Promise.reject(res)
  })
  // $axios.onError(() => {})
}
