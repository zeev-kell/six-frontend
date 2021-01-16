/**
 * Created by keziyuan on 2020/4/16 17:18.
 */
export default function ({ $axios, redirect }) {
  $axios.setBaseURL(process.env._AXIOS_BASE_URL_)
  $axios.onRequest((config) => {
    // eslint-disable-next-line no-console
  })
  $axios.onResponse((response) => {
    // $get $post 等，直接返回 data 对象
    return response
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
