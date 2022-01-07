import marked from 'marked'
import sanitizeHtml from 'sanitize-html'
import highlight from 'highlight.js'
// import 'highlight.js/styles/darcula.css'
import '@/directives/marked/marked.scss'

let toc = []
const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  // const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
  const id = `toc_${level}_${toc.length}`
  toc.push({
    id,
    level,
    text,
    index: toc.length,
    children: [],
  })
  return `<h${level} id="${id}"><a class="anchor" href="#${id}"><span class="header-link"></span></a>${text}</h${level}>`
}

marked.setOptions({
  renderer,
  highlight(code) {
    return highlight.highlightAuto(code).value
  },
})

/**
 * 转换 markdown 语法
 */
function translateMark(el, binding) {
  /**
   * modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
   * replace 是否替换回车
   * safe 是否是可信任的字符
   */
  const { replace, safe } = binding.modifiers
  const value = replace ? binding.value?.replace(/[↵ ]{2,}/g, '  \n') : binding.value
  if (!value) {
    return
  }
  const html = marked(value, { smartypants: false })
  // 首个P元素需要重置一下margin属性
  if (/^<p[> ]/.test(html)) {
    el.classList.add('marked-p')
  }
  el.innerHTML = safe ? sanitizeHtml(html) : html
}

/** @deprecated */
export default {
  marked: {
    update: translateMark,
    bind: translateMark,
    inserted(el) {
      if (el.className === '') {
        el.className = 'marked-content'
      } else if (!el.className.includes('marked-')) {
        el.className = el.className + ' marked-content'
      }
    },
  },
}

export function getTocObj(markdown) {
  toc = []
  const html = marked(markdown, { smartypants: false })
  return [html, toc]
}
