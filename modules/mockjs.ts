import path from 'path'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Module } from '@nuxt/types'
import { MockList as PipeMockList } from '../plugins/mock/pipe'
import { MockList as DatumMockList } from '../plugins/mock/datum'
import { MockList as UserMockList, refreshFun } from '../plugins/mock/user'
const mock = new MockAdapter(axios)

const MockModule: Module = function () {
  // 这个是配置服务器的拦截，一般都在 asyncData 函数里面起效，由 Node.js 发起请求
  mock.onPost(/\/v[12]\/token\/refresh/).reply(() => {
    return [200, refreshFun()]
  })
  ;[...UserMockList, ...PipeMockList, ...DatumMockList].forEach(([url, fn]: any) => {
    mock.onGet(new RegExp(url)).reply(() => {
      return [200, fn()]
    })
  })

  /** @function addPlugin */
  this.addPlugin(path.resolve(__dirname, '..', 'plugins', 'mock', 'index.ts'))
}

export default MockModule
