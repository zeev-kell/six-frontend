// import Mock from 'better-mock'
export const Workflow = {
  'workflow_id|+1': /[0-9]{7}/,
  workflow_name: '@PARAGRAPH',
  version: /v[0-9]{1}\.[0-9]{1}\.[0-9]{1}-r1044/,
  provider: '@name',
  public_time: '@datetime',
  'description|1': [
    'Antisense-induced ribosomal frameshifting',
    '新型冠状病毒(SARS)的主要特性及其防治',
    'Goda resultat av stentbehandling vid perforerat ulcus duodeni',
    'A Multi-Center Evaluation of Wavefront Aberrations in a Pseudophakic Population',
  ],
  settings: {
    index: {
      description: '对 fasta 文件构建 FM-index',
      params: {
        '-p': {
          name: '-p',
          optional: true,
          help: '指定索引文件命名前缀',
          value_type: 'str',
          value_mode: 'input',
          valid_range: '[0-9a-zA-Z]',
          default: 'fasta_bwa_indexed',
        },
        '-a': {
          name: '-a',
          optional: true,
          help: '选择索引算法',
          value_type: 'str',
          value_mode: 'selection',
          valid_range: '[is|bwtsw]',
          default: 'bwtsw',
        },
      },
    },
    mem: {
      description: '使用 MEM 算法进行局部比对',
      params: {
        '-t': {
          name: '-t',
          optional: true,
          help: '线程数',
          value_type: 'int',
          value_mode: 'input',
          valid_range: '[0-9]',
          default: 1,
        },
        '-M': {
          name: '-M',
          optional: true,
          help: '将 shorter split hits 标记为次优，以兼容 Picard’s markDuplicates 软件',
          value_type: 'boolean',
          value_mode: 'logical',
          valid_range: null,
          default: null,
        },
        '-p': {
          name: '-p',
          optional: true,
          help:
            ' 若无此参数：输入文件只有1个，则进行单端比对；若输入文件有2个，则作为paired reads进行比对。若加入此参数：则仅以第1个文件作为输入(输入的文件若有2个，则忽略之)，该文件必须是read1.fq和read2.fa进行reads交叉的数据。',
          value_type: 'boolean',
          value_mode: 'logical',
          valid_range: null,
          default: null,
        },
        '-R': {
          name: '-R',
          optional: true,
          help:
            "完整的read group的头部，可以用 '\t' 作为分隔符， 在输出的SAM文件中被解释为制表符TAB. read group 的ID，会被添加到输出文件的每一个read的头部。",
          value_type: 'str',
          value_mode: 'input',
          valid_range: '[@\\tA-Za-z:s0-9]',
          default: '@RG\\tID:{library}\\tLB:{library}\\tPL:Illumina\\tPU:{sample}\\tSM:{sample}',
        },
        '-T': {
          name: '-T',
          optional: true,
          help:
            '当比对的分值比 INT 小时，不输出该比对结果，这个参数只影响输出的结果，不影响比对的过程。-a 将所有的比对结果都输出，包括 single-end 和 unpaired paired-end的 reads，但是这些比对的结果会被标记为次优。',
          value_type: 'int',
          value_mode: 'input',
          valid_range: '[0-9]',
          default: 9,
        },
      },
    },
  },
  'category|1': ['序列比对', '去重', '分割'],
  download: 'docker push 6oclock/bwa:v0.7.12-r1044',
  tutorial: 'http://39.100.115.170:5000/tutorials/bwa.md',
}
export const WorkflowUrl = /\/api\/workflow\/[0-9]*/
export const WorkflowList = { 'items|10': [Workflow] }
export const WorkflowListUrl = /\/api\/workflowList/
