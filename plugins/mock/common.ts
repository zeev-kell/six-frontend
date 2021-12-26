import Mock from 'better-mock'
import { MockMark } from './helper'

export const Tag = {
  'id|+1': /[0-9]{3}/,
  name: '@name',
}
export const Tags = { 'items|10': [Tag] }
export const TagsUrl = /\/v[12]\/tags/
export const TagsFun = function () {
  return Mock.mock(Tags).items
}

export const MockList: any = [[TagsUrl, TagsFun]]

MockMark(MockList)
