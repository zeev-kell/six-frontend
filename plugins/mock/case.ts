import Mock from 'better-mock'
import { CaseModel } from '@/types/model/Case'
import { MockMark } from './helper'

export const Case = {
  type: 0,
  name: 'bowtie31',
  description: '是一个超快和节省内存的比对工具，用于将短序列比对到长参考序列上',
  content:
    '{\n    "version": "v0.1",\n    "workflow": {\n        "cwlVersion": "v1.0",\n        "class": "CommandLineTool",\n        "id": "bowtie2-build",\n        "label": "bowtie2 build",\n        "doc": "bowtie2 is an ultrafast and memory-efficient tool for aligning sequencing reads to long reference sequences",\n        "requirements": {\n            "ResourceRequirement": {\n                "ramMin": 10240,\n                "coresMin": 1\n            }\n        },\n        "hints": {\n            "DockerRequirement": {\n                "dockerPull": "6oclock/bowtie2-light:v2.2.9"\n            }\n        },\n        "baseCommand": [\n            "bowtie2-build"\n        ],\n        "inputs": [\n            {\n                "id": "reference_in",\n                "label": "reference file",\n                "type": "File",\n                "inputBinding": {\n                    "position": 25\n                }\n            },\n            {\n                "id": "bt2_index_base",\n                "label": "bt2 index base",\n                "type": "string?",\n                "doc": "write bt2 data to files with this dir/basename",\n                "inputBinding": {\n                    "position": 26\n                }\n            },\n            {\n                "id": "f",\n                "label": "f",\n                "type": [\n                    "null",\n                    "boolean"\n                ],\n                "doc": "reference files are Fasta (default)",\n                "inputBinding": {\n                    "position": 1,\n                    "prefix": "-f"\n                }\n            },\n            {\n                "id": "c",\n                "label": "c",\n                "type": [\n                    "null",\n                    "boolean"\n                ],\n                "doc": "reference sequences given on cmd line (as <reference_in>)",\n                "inputBinding": {\n                    "position": 2,\n                    "prefix": "-c"\n                }\n            },\n            {\n                "id": "large_index",\n                "label": "large index",\n                "type": [\n                    "null",\n                    "boolean"\n                ],\n                "doc": "force generated index to be \'large\', even if ref has fewer than 4 billion nucleotides",\n                "inputBinding": {\n                    "position": 3,\n                    "prefix": "--large-index"\n                }\n            },\n            {\n                "id": "noauto",\n                "label": "noauto",\n                "type": [\n                    "null",\n                    "boolean"\n                ],\n                "doc": "disable automatic -p/--bmax/--dcv memory-fitting",\n                "inputBinding": {\n                    "position": 4,\n                    "prefix": "--noauto"\n                }\n            },\n            {\n                "id": "packed",\n                "label": "packed",\n                "type": [\n                    "null",\n                    "boolean"\n                ],\n                "doc": "use packed strings internally; slower, less memory",\n                "inputBinding": {\n                    "position": 5,\n                    "prefix": "--packed"\n                }\n            },\n            {\n                "id": "bmax",\n                "label": "bmax",\n                "type": [\n                    "null",\n                    "int"\n                ],\n                "doc": "max bucket sz for blockwise suffix-array builder",\n                "inputBinding": {\n                    "position": 6,\n                    "prefix": "--bmax"\n                }\n            },\n            {\n                "id": "bmaxdivn",\n                "label": "bmaxdivn",\n                "type": [\n                    "null",\n                    "int"\n                ],\n                "doc": "max bucket sz as divisor of ref len",\n                "inputBinding": {\n                    "position": 7,\n                    "prefix": "--bmaxdivn"\n                }\n            },\n            {\n                "id": "dcv",\n                "label": "dcv",\n                "type": [\n                    "null",\n                    "int"\n                ],\n                "doc": "diff-cover period for blockwise",\n                "inputBinding": {\n                    "position": 8,\n                    "prefix": "--dcv"\n                }\n            },\n            {\n                "id": "nodc",\n                "label": "nodc",\n                "type": [\n                    "null",\n                    "boolean"\n                ],\n                "doc": "disable diff-cover (algorithm becomes quadratic)",\n                "inputBinding": {\n                    "position": 9,\n                    "prefix": "--nodc"\n                }\n            },\n            {\n                "id": "noref",\n                "label": "noref",\n                "type": [\n                    "null",\n                    "boolean"\n                ],\n                "doc": "don\'t build .3/.4 index files",\n                "inputBinding": {\n                    "position": 10,\n                    "prefix": "--noref"\n                }\n            },\n            {\n                "id": "justref",\n                "label": "justref",\n                "type": [\n                    "null",\n                    "boolean"\n                ],\n                "doc": "just build .3/.4 index files",\n                "inputBinding": {\n                    "position": 11,\n                    "prefix": "--justref"\n                }\n            },\n            {\n                "id": "offrate",\n                "label": "offrate",\n                "type": [\n                    "null",\n                    "int"\n                ],\n                "doc": "SA is sampled every 2^<int> BWT chars",\n                "inputBinding": {\n                    "position": 12,\n                    "prefix": "--offrate"\n                }\n            },\n            {\n                "id": "ftabchars",\n                "label": "ftabchars",\n                "type": [\n                    "null",\n                    "int"\n                ],\n                "doc": "of chars consumed in initial lookup",\n                "inputBinding": {\n                    "position": 13,\n                    "prefix": "--ftabchars"\n                }\n            },\n            {\n                "id": "threads",\n                "label": "threads",\n                "type": [\n                    "null",\n                    "int"\n                ],\n                "doc": "of threads",\n                "inputBinding": {\n                    "position": 14,\n                    "prefix": "--threads"\n                }\n            },\n            {\n                "id": "seed",\n                "label": "seed",\n                "type": [\n                    "null",\n                    "int"\n                ],\n                "doc": "seed for random number generator",\n                "inputBinding": {\n                    "position": 15,\n                    "prefix": "--seed"\n                }\n            },\n            {\n                "id": "quiet",\n                "label": "quiet",\n                "type": [\n                    "null",\n                    "boolean"\n                ],\n                "doc": "verbose output (for debugging)\\n",\n                "inputBinding": {\n                    "position": 15,\n                    "prefix": "--quiet"\n                }\n            }\n        ],\n        "outputs": [\n            {\n                "id": "indices",\n                "type": "File[]",\n                "outputBinding": {\n                    "glob": "*.bt2"\n                }\n            }\n        ]\n    },\n    "input": {\n        "threads": 2,\n        "reference_in": {\n            "class": "File",\n            "path": "http://www.sixoclock.net/resources/data/NGS/Homo_sapiens/Reference/hg19.chrM.fasta"\n        },\n        "bt2_index_base": "hg19.chrM"\n    },\n    "source": ""\n}',
  create_at: '2021-12-21 10:04:35',
  updated_at: '2021-12-21 10:04:35',
  instruction: '2',
  status: 2,
  readme: '这是一个readme文档',
  provider: '666oclock',
  category: [
    {
      id: 46,
      name: '比对',
    },
    {
      id: 53,
      name: 'cesjo',
    },
  ],
  'resource_id|+1': /[0-9]{7}/,
}
export const CaseUrl = /\/v[12]\/case\/[0-9]*/
export const CaseFun = function () {
  return Mock.mock(Case)
}
export const Cases = { 'items|10': [Case] }
export const CasesUrl = /\/v[12]\/cases/
export const CasesFun = function () {
  return {
    page: 1,
    size: 20,
    count: 100,
    data: Mock.mock(Cases).items,
  }
}
export const CasesSearchUrl = /\/v[12]\/search\/cases/
export const CasesSearchFun = function () {
  return {
    page: 1,
    size: 20,
    count: 100,
    data: Mock.mock(Cases).items,
  }
}
export const CaseUserUrl = /\/v[12]\/user\/cases/

// NOTE 由 Node.js 发起请求需要同步修改 modules 至 mock
Mock.mock('/v2/case', 'post', CaseFun)
Mock.mock(CaseUrl, 'delete')

export const MockList: any = [
  [CaseUrl, CaseFun],
  [CasesUrl, CasesFun],
  [CasesSearchUrl, CasesSearchFun],
  [CaseUserUrl, CasesFun],
]

MockMark(MockList)
