import { JobHelper } from 'cwlts/models/helpers/JobHelper'
import { WorkflowModel } from 'cwlts/models/generic/WorkflowModel'

export function normalizeJob(jobObject: any, model: WorkflowModel): any {
  const nullJob = JobHelper.getNullJobInputs(model)
  const job = jobObject || {}
  for (const key of Object.keys(job)) {
    // eslint-disable-next-line no-prototype-builtins
    if (!nullJob.hasOwnProperty(key)) {
      delete job[key]
    }
  }
  return { ...nullJob, ...job }
}
