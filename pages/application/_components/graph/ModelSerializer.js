import { WorkflowModel } from 'cwlts/models'
import * as Yaml from 'js-yaml'

export function serializeModel(model, embedReferences = true, asYaml = false, deleteSBGJob = false) {
  let obj
  if (embedReferences && model instanceof WorkflowModel) {
    obj = model.serializeEmbedded()
  } else {
    obj = model.serialize()
  }

  if (deleteSBGJob) {
    delete obj['sbg:job']
  }

  if (asYaml) {
    return Yaml.dump(obj, {
      json: true,
    })
  }

  return JSON.stringify(
    obj,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (key, value) => {
      if (typeof value === 'string') {
        return value.replace(/\u2002/g, ' ')
      }

      return value
    },
    4
  )
}
