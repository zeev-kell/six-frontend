import Mock from 'better-mock'
import { MockMark } from './helper'

export const Datum = {
  'data_id|+1': /[0-9]{7}/,
  'resource_id|+1': /[0-9]{7}/,
  name: 'chrM.fasta',
  version: '1.4',
  'type|1': [1],
  provider: 'keziyuan',
  website: 'http://39.100.115.170:5000/resources/data/NGS/Homo_sapiens/Reference/hg19.chrM.fasta',
  description: 'chrM\u53F7\u67D3\u8272\u4F53\u53C2\u8003\u57FA\u56E0\u7EC4\u5E8F\u5217',
  readme: '## chrM\u53F7\u67D3\u8272\u4F53\u53C2\u8003\u57FA\u56E0\u7EC4\u5E8F\u5217',
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
    '# --------\n# metadata: http://39.100.115.170:5000/resources/data/NGS/Homo_sapiens/Reference/hg19.chrM.fasta\n# --------\n\nencoding: utf-8\nformat: fasta\nhashing: md5\nname: hg19.chrm\npath: http://39.100.115.170:5000/resources/data/NGS/Homo_sapiens/Reference/hg19.chrM.fasta\nprofile: data-resource\nscheme: file\n\n',
}
export const datumUrl = /\/v[12]\/data\/[0-9]*/
export const datumFun = function (options: Mock.MockCbOptions) {
  const item = Mock.mock(Datum)
  const url = options?.url
  const match = url!?.match(/\/v[12]\/data\/([0-9]*)/)
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
Mock.mock(/\/v1\/osstoken/, 'get', function () {
  return {
    access_key_id: 'STS.NSmFEacMT4Ea6TgdXzjdjzmA6',
    access_key_secret: 'AATLWfbNSXQMQDFL7GRMsvBemKFNbPEjhLWkunYCPomt',
    security_token:
      'CAISvQJ1q6Ft5B2yfSjIr5DYDf/VjpJ1g4eKNHLWgFgvZutGlajq1Dz2IH1OfnNtAewbsvU1n2hY7voflr90UIQAXV3Ybcx2q49b8kasc4PEo8i4tR2jN24HXjr9MQXy+eOPSQqQLrqECB7ECT3tkit03sGkF1GLVECkNpukkINuas9tMCCzcTtBAqUgRG5ls9RIGnbNEvyvPxX24A/XF1E6ghdgrml95K+juOX+jCDTl1rn0OQYip3sK5y/FalWMYx4Ts2+0Z46FODI2zUC7ANRpuUkzv5f+CfAtdWaCFoW7gWPNvLQ/9FuNkg7RNBjQ/Aa/aalxaQo4rKOyNuu8XsXY7EJCRa4bZu73c7JFNmuMtsEbrvhMxzPqIvSbMOv7lt4PC5KblgSK4J9d2USExUpTSrBNqK85EBJvPEK9QwfuRqAAYEaVbPmEmMmTmtHcUBos/dM+FbVZjPJlQc2UDHlslmUcSSZIgG8zszqv4REY3wVuPQljU4DsqoY4pOwPr71fD64jhYrNc3WLOtx/cCfjt18EdP4m3mY1C+XbwCVp0P//g5K1XLqRWx14W2Fjd1GGu25iXLfh/zWM4aBfFlqygfa',
    callbackUrl: '/api/v1/osscallback',
  }
})
