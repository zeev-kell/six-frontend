/**
 * Created by keziyuan on 2020/4/16 17:16.
 */
import path from 'path'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Mock from 'better-mock'
import { Tools } from '../plugins/mock/tool'
import { Paper, Papers } from '../plugins/mock/paper'

export default function () {
  // 这个是配置服务器的拦截，一般都在 asyncData 函数里面起效
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios)
  // arguments for reply are (status, data, headers)
  mock.onGet(/\/papers/).reply(200, Mock.mock(Papers))
  mock.onGet(/\/paper\/PMC[0-9]{7}/).reply(200, Mock.mock(Paper))
  mock.onGet(/\/tools/).reply(200, Mock.mock(Tools))
  /** @function addPlugin */
  this.addPlugin(path.resolve(__dirname, '..', 'plugins', 'mockjs.js'))
}
