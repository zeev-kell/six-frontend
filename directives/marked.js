import marked from 'marked'
import sanitizeHtml from 'sanitize-html'
import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'

marked.setOptions({
  highlight(code) {
    return highlight.highlightAuto(code).value
  },
})
/**
 * 转换 markdown 语法
 */
function translateMark(el, binding) {
  /**
   * replace 是否替换回车
   * safe 是否是可信任的字符
   */
  const { replace, safe } = binding.modifiers
  const value = replace ? binding.value.replace(/[↵ ]{2,}/g, '  \n') : binding.value
  const html = marked(value, { smartypants: false })
  // 首个P元素需要重置一下margin属性
  if (/^<p[> ]/.test(html)) {
    el.classList.add('marked-p')
  }
  el.innerHTML = safe ? sanitizeHtml(html) : html
}
export default {
  marked: {
    update: translateMark,
    bind: translateMark,
  },
}
