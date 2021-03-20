import * as Yaml from 'js-yaml'

export function stringifyObject(object, asYaml = true) {
  if (asYaml) {
    return Yaml.dump(object, {
      json: true,
    })
  }
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
