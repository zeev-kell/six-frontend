import path from 'path'
import axios from 'axios'
import Mock from 'better-mock'
import MockAdapter from 'axios-mock-adapter'
import { Pipe, PipeUrl, Pipes, PipesUrl } from '../plugins/mock/pipe'
import { Workflow, WorkflowUrl, WorkflowList, WorkflowListUrl } from '../plugins/mock/workflow'

export default function () {
  // 这个是配置服务器的拦截，一般都在 asyncData 函数里面起效，由 Node.js 发起请求
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios)
  // arguments for reply are (status, data, headers)
  mock.onGet(PipeUrl).reply(200, () => Mock.mock(Pipe))
  mock.onGet(PipesUrl).reply(200, () => {
    return [200, Mock.mock(Pipes).items]
  })
  mock.onGet(WorkflowUrl).reply(200, () => Mock.mock(Workflow))
  mock.onGet(WorkflowListUrl).reply(200, () => {
    return [200, Mock.mock(WorkflowList).items]
  })
  mock.onGet(/\/README.md/).reply(200, () => {
    const randomBody = () => {
      const subTitle = `<h3>${Mock.Random.title()}</h3>`
      const subBody = `<div>${Mock.Random.cparagraph(30)}</div>`
      return subTitle + subBody
    }
    return [
      200,
      {
        title: Mock.Random.title(),
        body: Array.from({ length: Math.ceil(Math.random() * 3 + 3) })
          .map(randomBody)
          .join(''),
      },
    ]
  })
  /** @function addPlugin */
  this.addPlugin(path.resolve(__dirname, '..', 'plugins', 'mockjs.js'))
}
