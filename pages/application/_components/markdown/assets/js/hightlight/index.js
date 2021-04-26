// hljs体积过大，多数为解决代码高亮显示的问题,所以只引入部分语言，如果需要可自行加载

import hljs from 'highlight.js'

import javascript from 'highlight.js/lib/languages/javascript'
import java from 'highlight.js/lib/languages/java'
import css from 'highlight.js/lib/languages/css'
import less from 'highlight.js/lib/languages/less'
import go from 'highlight.js/lib/languages/go'
import markdown from 'highlight.js/lib/languages/markdown'
import php from 'highlight.js/lib/languages/php'
import python from 'highlight.js/lib/languages/python'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import autohotkey from 'highlight.js/lib/languages/autohotkey'
import auto from 'highlight.js/lib/languages/autoit'

const languages = {
  javascript,
  java,
  css,
  less,
  markdown,
  go,
  php,
  python,
  typescript,
  xml,
  autohotkey,
  auto,
}
Object.keys(languages).forEach((key) => {
  hljs.registerLanguage(key, languages[key])
})

export default hljs
