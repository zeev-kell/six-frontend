import * as Yaml from 'js-yaml'

export function stringifyObject(object: any, asYaml = true, space = 0): string {
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
    space
  )
}

export function getObject(str: string | object): any {
  if (typeof str !== 'string' && str) {
    return str
  }
  try {
    const obj = parseObj(str)
    if (obj) {
      return obj
    }
    return Yaml.load(str, { json: true })
  } catch (e) {
    console.log(`can't parse obj: ${str}`)
    console.log(e)
    return null
  }
}

function parseObj(str: string) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}

export function yamlToJson(str: string | object): any {
  if (typeof str !== 'string' && str) {
    // TODO
    return str
  }
  return Yaml.load(str, { json: true })
}
