// import Mock from 'better-mock'
export const Tool = {
  'id|+1': /Tool[0-9]{7}/,
  name: '@name',
  publish_time: '2018-12-31',
  url: 'https://www.baidu.com/?wd=@name',
  'description|1': [
    'Antisense-induced ribosomal frameshifting',
    '新型冠状病毒(SARS)的主要特性及其防治',
    'Goda resultat av stentbehandling vid perforerat ulcus duodeni',
    'A Multi-Center Evaluation of Wavefront Aberrations in a Pseudophakic Population',
  ],
  type: '@name',
  version: /[0-9]{1}\.[0-9]{1}\.[0-9]{1}/,
  configuration: '@name',
  config: {
    line: 1,
  },
}
export const Tools = { 'tools|10': [Tool] }
