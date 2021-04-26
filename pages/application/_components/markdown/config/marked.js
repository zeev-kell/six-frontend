import marked from 'marked'
import hljs from 'highlight.js'

hljs.initHighlightingOnLoad()

const renderer = new marked.Renderer()

export default marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  highlight(code) {
    return hljs.highlightAuto(code).value
  },
})
