import Mock from 'better-mock'
import { MockMark } from './helper'

export const refreshFun = function () {
  return Mock.mock({
    code: 100,
    data: {
      admin: false,
      permissions: 23,
      expires_at: 1923980785 + Mock.Random.integer(1000, 100000),
      refresh_token: Mock.Random.string('lower', 32),
      token: Mock.Random.string('lower', 32),
      uid: Mock.Random.string('lower', 32),
      uname: 'keziyuan',
    },
    msg: '登陆成功',
  })
}
export const userFun = function () {
  return Mock.mock({
    admin: false,
    uid: Mock.Random.string('lower', 32),
    uname: 'keziyuan',
    username: 'keziyuan',
    permissions: 23,
  })
}

Mock.mock(/\/v[12]\/login|(token\/refresh)/, 'post', refreshFun)
Mock.mock(/\/v[12]\/register/, 'post', function () {})
Mock.mock(/\/v[12]\/logout/, 'get', function () {})

export const MockList: any = [[/\/v[12]\/user\/(info|profile)/, userFun]]

MockMark(MockList)
