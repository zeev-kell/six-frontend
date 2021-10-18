import Mock from 'better-mock'

export const Datum = {
  data_id: 'e2f9329d-851e-499b-9ef8-389d60fd7e87',
  name: 'chrM.fasta',
  version: '1.4',
  'type|1': [0, 1, 2],
  provider: '666oclock',
  website: 'http://39.100.115.170:5000/resources/data/NGS/Homo_sapiens/Reference/hg19.chrM.fasta',
  description: 'chrM\u53F7\u67D3\u8272\u4F53\u53C2\u8003\u57FA\u56E0\u7EC4\u5E8F\u5217',
  create_at: '2021-10-05 10:50:41',
  category: '\u53C2\u8003\u5E8F\u5217',
  status: 2,
  versions: [
    {
      resource_id: '9a56d5d8-9f1c-421a-bff0-8601149631fc',
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
}
export const Data = { 'items|10': [Datum] }
export const dataUrl = /\/v[12]\/datas/
export const dataFun = function () {
  return Mock.mock(Data).items
}

Mock.mock(dataUrl, dataFun)
