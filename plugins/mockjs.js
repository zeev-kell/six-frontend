import Mock from 'better-mock'
import { Pipes, PipesUrl } from '../plugins/mock/pipe'
// NOTE 由 Node.js 发起请求需要同步修改 modules 至 mock
Mock.mock(/\/api\/login/, 'post', function (options) {
  const body = JSON.parse(options.body)
  return Mock.mock({
    username: body.username,
    token: Mock.Random.string('lower', 32),
    expireAt: 1625160000 + Mock.Random.integer(1000, 100000),
    status: 1,
  })
})
Mock.mock(/\/api\/register/, 'post', function (options) {
  // eslint-disable-next-line no-console
})
Mock.mock(PipesUrl, function () {
  return Mock.mock(Pipes).items
})
