import Mock from 'better-mock'
import { MockMark } from './helper'

export const Datum = {
  'data_id|+1': /[0-9]{7}/,
  'resource_id|+1': /[0-9]{7}/,
  name: 'chrM.fasta',
  version: '1.4',
  'type|1': [0, 1, 2],
  provider: 'keziyuan',
  website: 'http://39.100.115.170:5000/resources/data/NGS/Homo_sapiens/Reference/hg19.chrM.fasta',
  description: 'chrM\u53F7\u67D3\u8272\u4F53\u53C2\u8003\u57FA\u56E0\u7EC4\u5E8F\u5217',
  create_at: '2021-10-05 10:50:41',
  category: '\u53C2\u8003\u5E8F\u5217',
  status: 2,
  versions: [
    {
      'resource_id|+1': /[0-9]{7}/,
      data_name: 'chrM.fasta',
      type: 1,
      version: '1.4',
      create_at: '2021-10-05 10:50:41',
      updated_at: '2021-10-05 10:50:41',
      status: 2,
      content:
        "'# --------\n# metadata: http://39.100.115.170:5000/resources/data/NGS/Homo_sapiens/Reference/hg19.chrM.fasta\n# --------\n\nencoding: utf-8\nformat: fasta\nhashing: md5\nname: hg19.chrm\npath: http://39.100.115.170:5000/resources/data/NGS/Homo_sapiens/Reference/hg19.chrM.fasta\nprofile: data-resource\nscheme: file\n\n'",
    },
  ],
  content:
    "'# --------\n# metadata: http://39.100.115.170:5000/resources/data/NGS/Homo_sapiens/Reference/hg19.chrM.fasta\n# --------\n\nencoding: utf-8\nformat: fasta\nhashing: md5\nname: hg19.chrm\npath: http://39.100.115.170:5000/resources/data/NGS/Homo_sapiens/Reference/hg19.chrM.fasta\nprofile: data-resource\nscheme: file\n\n'",
}
export const datumUrl = /\/v[12]\/data\/[0-9]*/
export const datumFun = function (options: Mock.MockCbOptions) {
  const item = Mock.mock(Datum)
  const { url } = options
  const match = url.match(/\/v[12]\/data\/([0-9]*)/)
  if (match && match[1]) {
    item.resource_id = match[1]
  }
  return item
}
export const Data = { 'items|10': [Datum] }
export const dataUrl = /\/v[12]\/datas/
export const dataFun = function () {
  return Mock.mock(Data).items
}

export const MockList: any = [
  [datumUrl, datumFun],
  [dataUrl, dataFun],
]

MockMark(MockList)

Mock.mock(/\/v2\/data/, 'post', datumFun)
