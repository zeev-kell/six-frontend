/**
 * Created by keziyuan on 2020/4/16 17:18.
 */
export default function ({ $axios, redirect }) {
  $axios.setBaseURL(process.env.BASE_URL)
  $axios.onRequest((config) => {
    // eslint-disable-next-line no-console
  })
  $axios.onResponse((response) => {
    // eslint-disable-next-line no-console
    return response
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
