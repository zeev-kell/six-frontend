import { JobHelper } from 'cwlts/models/helpers/JobHelper'
import { WorkflowModel } from 'cwlts/models/generic/WorkflowModel'

export function normalizeJob(jobObject: any, model: WorkflowModel): any {
  const nullJob: any = JobHelper.getNullJobInputs(model)
  const job = jobObject || {}
  for (const key of Object.keys(job)) {
    if (!Object.prototype.hasOwnProperty.call(nullJob, key)) {
      delete job[key]
    }
  }
  return { ...nullJob, ...job }
}
