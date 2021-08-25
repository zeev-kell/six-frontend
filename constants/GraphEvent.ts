export const enum GraphEvent {
  // 往上传播事件
  Propagate = 'propagate-event',
  // 往下广播事件
  Dispatch = 'dispatch-event',
  // 工具事件传播
  ToolEvent = 'tool-event',

  // 触发事件 [trigger]-[目标]-[方法]
  TriggerGraphWarning = 'trigger-graph-warning',
  TriggerGraphDownload = 'trigger-graph-download',
  TriggerGraphSaveContent = 'trigger-graph-save-content',
  TriggerGraphEmpty = 'trigger-graph-empty',
  TriggerPageModalCreate = 'trigger-page-modal-create',

  // 触发事件（往下）
  PayloadUpdateJob = 'update-job',

  // 回调事件（往下）
}
