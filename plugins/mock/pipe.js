// import Mock from 'better-mock'
import cwl from './cwl.json'
export const Pipe = {
  'pipe_id|+1': /[0-9]{7}/,
  name: '@name',
  version: /v[0-9]{1}\.[0-9]{1}\.[0-9]{1}-r1044/,
  provider: '@name',
  create_at: '@datetime',
  'description|1': [
    'Antisense-induced ribosomal frameshifting',
    '新型冠状病毒(SARS)的主要特性及其防治',
    'Goda resultat av stentbehandling vid perforerat ulcus duodeni',
    'A Multi-Center Evaluation of Wavefront Aberrations in a Pseudophakic Population',
  ].map((v) => {
    return Array.from({ length: Math.ceil(Math.random() * 10) })
      .map((k) => v)
      .join('')
  }),
  'category|1': ['序列比对', '去重', '分割'],
  download: 'docker push 6oclock/bwa:v0.7.12-r1044',
  tutorial: 'http://39.100.115.170:5000/tutorials/bwa.md',
  cwl,
  'type|1': ['0', '1'],
  website: 'http://www.bwa.com',
}
export const PipeUrl = /\/api\/pipe\/[0-9]*/
export const Pipes = { 'items|10': [Pipe] }
export const PipesUrl = /\/api\/pipes/
