export const enum GraphEvent {
  // 往下广播事件
  Dispatch = 'dispatch-event',
  // 往上传播事件
  Propagate = 'propagate-event',

  // 工具事件
  ToolEvent = 'tool-event',

  // 触发事件（往上）
  TriggerWarning = 'trigger-warning',
  TriggerDownload = 'trigger-download',
  TriggerSaveContent = 'trigger-save-content',

  // 触发事件（往下）
  PayloadUpdateJob = 'update-job',

  // 回调事件（往下）
}
