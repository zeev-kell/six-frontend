import marked from 'marked'
import sanitizeHtml from 'sanitize-html'
/**
 * 转换 markdown 语法
 */
export default {
  marked: {
    update(el, binding) {
      const html = marked(binding.value)
      // 首个P元素需要重置一下margin属性
      if (/^<p[> ]/.test(html)) {
        el.classList.add('marked-p')
      }
      el.innerHTML = sanitizeHtml(html)
    },
  },
}
