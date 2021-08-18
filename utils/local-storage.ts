export const setStore = (name: string, content: string | unknown): void => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content as string)
}

export const getStore = (name: string, parse = false): void | null | string => {
  if (!name) return
  let value: string | null = window.localStorage.getItem(name)
  if (parse) {
    try {
      value = JSON.parse(value as string)
    } catch (e) {
      value = null
    }
  }
  return value
}

export const removeStore = (name: string): void => {
  if (!name) return
  window.localStorage.removeItem(name)
}
