export default {
  // 通用
  common: {
    tips: 'Tips',
    name: 'Name',
    or: 'or',
    status: 'State',
    creator: 'Created By',
    createTime: 'Creation Time',
    updater: 'Revisor',
    updateTime: 'Modification Time',
    operation: 'Operation',
    type: 'Type',
    file_type: 'File Type',
    required: 'Required',
    description: 'Description',
    default: 'Default',
    version: 'Version',
    yes: 'Yes',
    no: 'No',
    metadata: 'Metadata',
    port: 'Port',
    exposed: 'Exposed',
    none: 'None',
    author: 'author',
    source: 'source',
    cwl_version: 'cwl version',
    revision: 'revision',
    toolkit: 'toolkit',
    label: 'Label',
  },
  TYPE_TOOL: 'Tool',
  TYPE_APP: 'Workflow',
  TYPE_DOCKER: 'Dockerfile',
  TYPE_WORK: '工作',
  TYPE_WORKFLOW: '工作流',
  TYPE_FORMAT: '格式',
  TYPE_DATA: '数据',
  TYPE_DATA_PACKAGE: '数据包',
  // 导航条
  nav: {
    index: '主页',
    product: '产品',
    download: '下载中心',
    about: '关于我们',
    help: '帮助中心',
    login: '登录',
    register: '注册',
    exit: 'Exit',
    personalInfo: 'Personal Information',
  },
  // 路由-路由标题等
  router: {
    task: 'Task Management',
    task_create: 'Create Task',
    workflow: 'Workflow Management',
    workflow_create: 'Create Workflow',
    workflow_edit: 'Edit Workflow',
  },
  // 按钮
  btn: {
    ok: 'Confirm',
    cancel: 'Cancel',
    edit: 'Edit',
    close: 'Close',
    on: 'On',
    off: 'Off',
    delete: 'Delete',
    copy: 'Copy',
    view: 'View',
    add: 'Add',
    select_file: 'Select File(s)',
    select_all: 'Select All',
    to_upload: 'Upload to server',
    save: 'Save',
    back: 'Back',
  },
  // 常量
  constant: {
    STATUS_DRAFT: 'Draft',
    STATUS_OFF: 'Off',
    STATUS_ON: 'On',
  },
  // 错误信息
  error: {
    // 用在捕抓未知异常
    exception: 'Exception. Please refresh the page.',
    upload: 'Upload failed.',
  },
  // 提示语
  msg: {
    success: 'Operation succeeded',
    error: 'operation failed',
    confirm_delete: 'Are you sure to delete it?',
    confirm_off: 'Are you sure to disable it?',
  },
  // 参数校验提示
  validate: {
    key: '{0} must be set',
    length: 'Length between {0} and {1} characters',
  },
  placeholder: {
    name: 'Pls enter a name',
    version: 'Pls enter version',
    command: 'Pls enter execute command',
    docker_file: 'Pls upload dockerfile',
    min_mem: 'Pls input min memory',
    min_cores: 'Pls input min cpu',
    search: 'Pls enter a search',
  },
  graph: {
    single_thread: 'single thread',
    multi_thread: 'multi thread',
    info: 'Info',
    input: 'Input',
    step: 'Step Info',
    description: 'Description',
    Files: 'Files',
    app_parameters: 'App Parameters',
    error: {
      has_issues: 'Graphics issues need to be addressed.',
    },
    cpu_resources: 'Cpu Resources',
    file: 'FILE',
    AppParameters: 'App parameters',
    NoAppParams: 'No app parameters are exposed for this app.',
    NoValue: 'No values have been specified for this input.',
    Browse: 'Browse',
    Required: 'Required',
    SecondaryFiles: 'Secondary Files',
    Description: 'Description',
    Connections: 'Connections',
    SetValue: 'Set Value',
    SetNull: 'Set Values to null',
    AllowArrayAsSingle: 'Allow array as well as a single item',
    files_and_metadata: 'Secondary files and metadata',
    add_files_and_metadata: 'Add secondary files and metadata',
    add_file: 'Add a file',
    directory: 'a directory',
    port_default: 'Set default value for execution',
    port_exposed: 'Set value with the option to edit on the test page',
    port_port: 'Get value from another node on the canvas',
    link_merge_method: 'Link Merge Method',
    not_connected: 'This port is not connected',
    required_not_connected: 'This required port is not connected',
    merge_nested: 'Nested',
    merge_flattened: 'Flattened',
  },
}
