const DEFAULT_RESPONSE = { status: 500, msg: '服务器异常' }
export default function ({ $axios, redirect, store }) {
  $axios.setBaseURL(process.env._AXIOS_BASE_URL_)
  $axios.onRequest((config) => {
    return config
  })
  $axios.onRequestError((error) => {
    // eslint-disable-next-line no-console
    console.log('onRequestError', error)
  })
  $axios.onResponse((response) => {
    // eslint-disable-next-line no-undef,no-console
    console.log(response)
    // $get $post 等，直接返回 data 对象
    return response
  })
  $axios.onResponseError((error) => {
    // eslint-disable-next-line no-console
    console.log('onResponseError', error)
    if (!error.response || !error.response.status) {
      return Promise.reject(DEFAULT_RESPONSE)
    }
    if (error.response.status === 401) {
      store.commit('CLEAR_USER_INFO', process.server)
      redirect('/login?notAuthorized=true')
      return
    }
    return Promise.reject(error.response.data)
  })
  // $axios.onError(() => {})
}
