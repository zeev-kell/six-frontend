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
    return Promise.reject(error.response && error.response.status ? error.response.data : DEFAULT_RESPONSE)
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
