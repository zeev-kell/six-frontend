import * as Yaml from 'js-yaml'

export function stringifyObject(object, asYaml = true) {
  if (asYaml) {
    // 转成 yaml 格式字符
    return Yaml.dump(object, {
      json: true,
    })
  }
  // 转成 json 格式字符
  return JSON.stringify(
    object,
    (key, value) => {
      if (typeof value === 'string') {
        return value.replace(/\u2002/g, ' ')
      }
      return value
    },
    4
  )
}

export function getObject(str) {
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
