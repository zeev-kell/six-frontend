import { TokenKey } from '@/utils/local-storage'
const DEFAULT_RESPONSE = { status: 500, msg: '服务器异常' }
export default function ({ $axios, redirect, store }) {
  $axios.setBaseURL(process.env._AXIOS_BASE_URL_)
  $axios.onRequest((config) => {
    if (store.state[TokenKey]) {
      config.headers.common.Authorization = store.state[TokenKey]
    }
    return config
  })
  $axios.onResponse((response) => {
    // $get $post 等，直接返回 data 对象
    return response
  })
  $axios.onResponseError((error) => {
    if (!error.response || !error.response.status) {
      return Promise.reject(DEFAULT_RESPONSE)
    }
    if (error.response.status === 401) {
      store.commit('CLEAR_USER_INFO')
      redirect('/login')
    }
    return Promise.reject(error.response.data)
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    } else if (code === 401) {
      store.commit('CLEAR_USER_INFO')
      redirect('/login')
    }
  })
}
