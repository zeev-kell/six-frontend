import path from 'path'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Mock from 'better-mock'
import { Pipe, PipeUrl, Pipes, PipesUrl } from '../plugins/mock/pipe'

export default function () {
  // 这个是配置服务器的拦截，一般都在 asyncData 函数里面起效，由 Node.js 发起请求
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios)
  // arguments for reply are (status, data, headers)
  mock.onGet(PipeUrl).reply(200, Mock.mock(Pipe))
  mock.onGet(PipesUrl).reply(() => {
    return [200, Mock.mock(Pipes).items]
  })
  /** @function addPlugin */
  this.addPlugin(path.resolve(__dirname, '..', 'plugins', 'mockjs.js'))
}
