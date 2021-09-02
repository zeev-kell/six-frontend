export const setStore = (name: string, content: string | unknown): void => {
  if (process.server) {
    return
  }
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  localStorage.setItem(name, content as string)
}

export function compareStore(name: string, str: string) {
  const oldContent = getStore(name)
  return oldContent && (oldContent as unknown as string) === str
}

export const getStore = (name: string, parse = false): void | null | string => {
  if (process.server) {
    return
  }
  if (!name) return
  let value: string | null = localStorage.getItem(name)
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
  if (process.server) {
    return
  }
  if (!name) return
  localStorage.removeItem(name)
}
