export const enum GraphEvent {
  // 往下广播事件
  Dispatch = 'dispatch-event',
  // 往上传播事件
  Propagate = 'propagate-event',

  // 触发事件（往上）
  TriggerAdd = 'trigger-add',
  TriggerEdit = 'trigger-edit',
  TriggerWarning = 'trigger-warning',

  // 触发事件（往下）
  PayloadUpdateJob = 'update-job',

  // 回调事件（往下）
  CallAddStep = 'call-add-step',
}
