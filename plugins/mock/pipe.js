// import Mock from 'better-mock'
import cwl from './commandline.json'
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
  tutorial:
    // eslint-disable-next-line no-template-curly-in-string
    'bowtie2↵ ↵ ## 功能简介↵ ↵ 是一个超快和节省内存的比对工具，用于将短序列比对到长参考序列上↵ ↵ ## 输入文件↵ ↵ 参考基因组fasta文件(*.fasta/*.fa),待比对物种的参考基因组，一般为fasta格式的文本文件↵ 测序fastq文件(*.fq/*.fq.gz)：待比对reads序列，一般为包含成千上万条reads的文本文件。↵ ↵ ↵ ## 输出文件↵ sam文件：比对好的存放reads比对结果信息的文件↵ ↵ ↵ ## 下载使用↵ 软件运行条件：↵ 1. docker ↵ 2. git↵ ↵ 确保操作系统中docker和git软件，并且当前用户具有docker运行权限。↵ ↵ ↵ 下载方式一：↵ dockerhub：↵ docker pull 6oclock/bowtie2-light:v2.2.9↵ ↵ 下载方式二：↵ 阿里docker镜像仓库：↵ sudo docker pull registry.cn-shenzhen.aliyuncs.com/6oclock/bowtie2-light:v2.2.9↵ ↵ ↵ ## 使用案例↵ #### 下载测试数据↵ git clone https://github.com/6-oclock/example-data.git↵ ↵ #### 建立索引 index↵ ↵ WORKDIR=`readlink -f ./`↵ docker run -v ${WORKDIR}:${WORKDIR} 6oclock/bowtie2-light:v2.2.9 bowtie2-build ${WORKDIR}/example-data/NGS/reference/chrM.fa chrM↵ ↵ #### hisat2 单端比对↵ docker run -v ${WORKDIR}:${WORKDIR} 6oclock/bowtie2-light:v2.2.9 -p 4 -x ${WORKDIR}/example-data/NGS/reference/chrM -U ${WORKDIR}/example-data/NGS/reads/reads_1.fq -S bowtie2-se.sam↵ ↵ #### hisat2 双端比对↵ docker run -v ${WORKDIR}:${WORKDIR} 6oclock/hisat2:v2.2.0 hisat2 -p 4 -x ${WORKDIR}/example-data/NGS/reference/chrM -1 ${WORKDIR}/example-data/NGS/reads/reads_1.fq -2 ${WORKDIR}/example-data/NGS/reads/reads_2.fq -S bowtie2-pe.sam↵ ↵ ↵ ## 软件出处与原文链接↵ gtihub：http://bowtie-bio.sourceforge.net/bowtie2/manual.shtml↵',
  cwl,
  'type|1': [0, 1],
  website: 'http://www.bwa.com',
}
export const PipeUrl = /\/api\/v1\/pipe[^s]/
export const Pipes = { 'items|10': [Pipe] }
export const PipesUrl = /\/api\/v1\/pipes/
