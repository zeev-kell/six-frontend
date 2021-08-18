import * as Yaml from 'js-yaml'

export function stringifyObject(object: any, asYaml = true): string {
  if (asYaml) {
    // 转成 yaml 格式字符
    return Yaml.dump(object)
  }
  // 转成 json 格式字符
  return JSON.stringify(
    object,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (key, value): string => {
      if (typeof value === 'string') {
        return value.replace(/\u2002/g, ' ')
      }
      return value
    },
    4
  )
}

export function getObject(str: string | object): any {
  if (typeof str !== 'string' && str) {
    return str
  }
  try {
    const obj = JSON.parse(str)
    if (typeof obj === 'object' && obj) {
      return obj
    } else {
      return Yaml.load(str, { json: true })
    }
  } catch (e) {
    return Yaml.load(str, { json: true })
  }
}
