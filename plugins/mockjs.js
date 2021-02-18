import Mock from 'better-mock'
import { Pipe, Pipes, PipeUrl, PipesUrl } from '../plugins/mock/pipe'
// import { Workflow, WorkflowUrl, WorkflowList, WorkflowListUrl } from '../plugins/mock/workflow'
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
Mock.mock(PipeUrl, function () {
  return Mock.mock(Pipe)
})
Mock.mock(PipesUrl, function () {
  return Mock.mock(Pipes).items
})
// Mock.mock(WorkflowUrl, function () {
//   return Mock.mock(Workflow)
// })
// Mock.mock(WorkflowListUrl, function () {
//   return Mock.mock(WorkflowList).items
// })
Mock.mock(/\/README.md/, function () {
  const randomBody = () => {
    const subTitle = `<h3>${Mock.Random.title()}</h3>`
    const subBody = `<div>${Mock.Random.cparagraph(30)}</div>`
    return subTitle + subBody
  }
  return {
    title: Mock.Random.title(),
    body: Array.from({ length: Math.ceil(Math.random() * 3 + 3) })
      .map(randomBody)
      .join(''),
  }
})
