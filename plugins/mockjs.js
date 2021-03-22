import Mock from 'better-mock'
import { Pipe, Pipes, PipeUrl, PipesUrl } from '../plugins/mock/pipe'
import _tool from '../plugins/mock/commandline.json'
import _workflow from '../plugins/mock/cwl.json'
// import { Workflow, WorkflowUrl, WorkflowList, WorkflowListUrl } from '../plugins/mock/workflow'
// NOTE 由 Node.js 发起请求需要同步修改 modules 至 mock
Mock.mock(/\/api\/v1\/login/, 'post', function (options) {
  const body = JSON.parse(options.body)
  return Mock.mock({
    code: 100,
    data: {
      admin: false,
      expires_at: 1923980785 + Mock.Random.integer(1000, 100000),
      token: Mock.Random.string('lower', 32),
      uid: Mock.Random.string('lower', 32),
      uname: body.username,
    },
    msg: '登陆成功',
  })
})
Mock.mock(/\/api\/v1\/register/, 'post', function (options) {
  // eslint-disable-next-line no-console
})
Mock.mock(PipeUrl, function () {
  const item = Mock.mock(Pipe)
  item.type = 0
  item.cwl = item.type === 0 ? _tool : _workflow
  return item
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
// Mock.mock(/\/markdown.md/, function () {
//   const randomBody = () => {
//     const subTitle = `<h3>${Mock.Random.title()}</h3>`
//     const subBody = `<div>${Mock.Random.cparagraph(30)}</div>`
//     return subTitle + subBody
//   }
//   return {
//     title: Mock.Random.title(),
//     body: Array.from({ length: Math.ceil(Math.random() * 3 + 3) })
//       .map(randomBody)
//       .join(''),
//   }
// })
