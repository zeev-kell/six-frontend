import marked from 'marked'
import sanitizeHtml from 'sanitize-html'
/**
 * 转换 markdown 语法
 */
function translateMark(el, binding) {
  const html = marked.parseInline(binding.value.replace(/[↵ ]{2,}/g, '<br/>'), { smartypants: true })
  // 首个P元素需要重置一下margin属性
  if (/^<p[> ]/.test(html)) {
    el.classList.add('marked-p')
  }
  el.innerHTML = sanitizeHtml(html)
}
export default {
  marked: {
    update: translateMark,
    bind: translateMark,
  },
}
