import path from 'path'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Module } from '@nuxt/types'
import { pipesUrl, pipesFun, pipeUrl, pipeFun, pipeUserUrl } from '../plugins/mock/pipe'
import { refreshFun, userFun } from '../plugins/mock/user'
import { dataFun, dataUrl } from '../plugins/mock/datum'
const mock = new MockAdapter(axios)

const MockModule: Module = function () {
  // 这个是配置服务器的拦截，一般都在 asyncData 函数里面起效，由 Node.js 发起请求
  mock.onPost(/\/v[12]\/token\/refresh/).reply(() => {
    return [200, refreshFun()]
  })
  mock.onGet(/\/v[12]\/user\/(info|profile)/).reply(() => {
    return [200, userFun()]
  })
  mock.onGet(pipeUrl).reply(() => {
    return [200, pipeFun()]
  })
  mock.onGet(pipesUrl).reply(() => {
    return [200, pipesFun()]
  })
  mock.onGet(pipeUserUrl).reply(() => {
    return [200, pipesFun()]
  })
  mock.onGet(dataUrl).reply(() => {
    return [200, dataFun()]
  })

  /** @function addPlugin */
  this.addPlugin(path.resolve(__dirname, '..', 'plugins', 'mock', 'index.ts'))
}

export default MockModule
