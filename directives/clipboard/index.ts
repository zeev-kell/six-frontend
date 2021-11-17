/* eslint-disable camelcase */
import Clipboard from 'clipboard'
import Element from 'element-ui'
import { DirectiveBinding, DirectiveOptions } from 'vue/types/options'

const VueClipboardConfig = {
  autoSetContainer: false,
  appendToBody: true, // This fixes IE, see #50
}

function copyText(text: string, container?: HTMLElement) {
  return new Promise(function (resolve, reject) {
    const fakeElement = document.createElement('button')
    const clipboard = new Clipboard(fakeElement, {
      text() {
        console.log(text)
        return text
      },
      action() {
        return 'copy'
      },
      container: typeof container === 'object' ? container : document.body,
    })
    clipboard.on('success', function (e) {
      clipboard.destroy()
      resolve(e)
    })
    clipboard.on('error', function (e) {
      clipboard.destroy()
      reject(e)
    })
    if (VueClipboardConfig.appendToBody) document.body.appendChild(fakeElement)
    fakeElement.click()
    if (VueClipboardConfig.appendToBody) document.body.removeChild(fakeElement)
  })
}

interface ClipboardElement extends HTMLElement {
  _clipboard_success?: (e: any) => void
  _clipboard_error?: (e: any) => void
  _clipboard: any
}

export default {
  clipboard: {
    update(el: ClipboardElement, binding: DirectiveBinding) {
      if (binding.arg === 'success') {
        el._clipboard_success = binding.value
      } else if (binding.arg === 'error') {
        el._clipboard_error = binding.value
      } else {
        el._clipboard.text = function () {
          return binding.value
        }
        el._clipboard.action = function () {
          return binding.arg === 'cut' ? 'cut' : 'copy'
        }
        el.setAttribute('title', binding.value)
      }
    },
    bind(el: ClipboardElement, binding: DirectiveBinding) {
      if (binding.arg === 'success') {
        el._clipboard_success = binding.value
      } else if (binding.arg === 'error') {
        el._clipboard_error = binding.value
      } else {
        const clipboard = new Clipboard(el, {
          text() {
            return binding.value
          },
          action() {
            return binding.arg === 'cut' ? 'cut' : 'copy'
          },
          container: VueClipboardConfig.autoSetContainer ? el : undefined,
        })
        clipboard.on('success', function (e) {
          const callback = el._clipboard_success
          if (callback) {
            callback(e)
          } else {
            Element.Message.success('复制成功')
          }
        })
        clipboard.on('error', function (e) {
          const callback = el._clipboard_error
          if (callback) {
            callback(e)
          } else {
            clipboard.destroy()
            Element.Message.error('复制失败，请手动复制...')
          }
        })
        el._clipboard = clipboard
        el.setAttribute('title', binding.value)
      }
    },
    unbind(el: ClipboardElement, binding: DirectiveBinding) {
      if (binding.arg === 'success') {
        delete el._clipboard_success
      } else if (binding.arg === 'error') {
        delete el._clipboard_error
      } else {
        el._clipboard.destroy()
        delete el._clipboard
      }
    },
    inserted(el: ClipboardElement) {
      el.classList.add('clipboard')
    },
  } as unknown as DirectiveOptions,
}

export { VueClipboardConfig, copyText }
