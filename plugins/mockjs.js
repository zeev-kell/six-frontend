import Mock from 'better-mock'
import { Tools } from '../plugins/mock/tool'
import { Paper, Papers } from '../plugins/mock/paper'
// NOTE 增加接口需要同步修改 modules 至 mock
Mock.mock(/\/papers/, Papers)
Mock.mock(/\/paper\/PMC[0-9]{7}/, Paper)
Mock.mock(/\/login/, 'post', function (options) {
  // eslint-disable-next-line no-console
  const body = JSON.parse(options.body)
  return Mock.mock({
    username: body.username,
    accessToken: Mock.Random.string('lower', 32),
    refreshToken: Mock.Random.string('lower', 32),
    expireAt: 1625160000 + Mock.Random.integer(1000, 100000),
    status: 1,
  })
})
Mock.mock(/\/register/, 'post', function (options) {
  // eslint-disable-next-line no-console
})
Mock.mock(/\/tools/, Tools)
