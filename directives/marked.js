import marked from 'marked'
import sanitizeHtml from 'sanitize-html'
/**
 * 转换 markdown 语法
 */
function translateMark(el, binding) {
  const html = marked(binding.value.replace(/[↵ ]{2,}/g, '  \n'), { smartypants: true })
  // eslint-disable-next-line no-console
  // console.log(html)
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
