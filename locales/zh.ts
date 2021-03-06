export default {
  // 通用
  common: {
    yes: '是',
    no: '否',
    or: '或',
    tips: '提示',
    name: '名称',
    status: '状态',
    creator: '创建人',
    createTime: '创建时间',
    updater: '修改人',
    updateTime: '修改时间',
    operation: '操作',
    type: '类型',
    file_type: '文件类型',
    items_type: '子类型',
    required: '是否必须',
    description: '描述',
    default: '默认值',
    version: '版本',
    metadata: '元数据',
    port: '端口',
    exposed: '暴露',
    none: '空',
    author: '作者',
    source: '来源',
    cwl_version: 'cwl版本',
    revision: '修订',
    toolkit: '工具箱',
    label: '标签',
  },
  // 导航条
  nav: {
    index: '主页',
    product: '产品',
    download: '下载中心',
    about: '关于我们',
    help: '帮助中心',
    login: '登录',
    register: '注册',
    exit: '退出',
    personalInfo: '个人中心',
  },
  // 路由-路由标题等
  router: {
    task: 'Task 管理',
    task_create: '新增 Task',
    workflow: '流程管理',
    workflow_create: '新增流程',
    workflow_edit: '流程编辑',
  },
  // 按钮
  btn: {
    ok: '确定',
    cancel: '取消',
    edit: '编辑',
    close: '关闭',
    on: '启用',
    off: '禁用',
    delete: '删除',
    copy: '复制',
    view: '查看',
    add: '新增',
    select_file: '选择文件',
    select_all: '全选',
    to_upload: '上传到服务器',
    save: '保存',
    back: '返回',
    hide: '隐藏',
    show: '显示',
  },
  // 常量
  constant: {
    STATUS_DRAFT: '草稿',
    STATUS_OFF: '禁用',
    STATUS_ON: '启用',
    TYPE_TOOL: '工具',
    TYPE_APP: '流程',
    // TYPE_DOCKER: 'Dockerfile',
    // TYPE_WORK: '工作',
    // TYPE_WORKFLOW: '工作流',
    TYPE_WIKI: 'wiki',
    TYPE_COURSE: '教程',
    TYPE_ARTICLE: '文章',
    TYPE_CWLC: 'cwlc文件', // cwlc文件
    TYPE_JUPYTER: 'jupyter notebook', // jupyter notebook
    TYPE_RSTUDIO: ' Rstudio notebook', // Rstudio notebook
    TYPE_FORMAT: '格式',
    TYPE_DATA: '数据',
    TYPE_DATA_PACKAGE: '数据包',
    STATUS_READING: '读取中',
    STATUS_PENDING: '等待',
    STATUS_UPLOADING: '上传中',
    STATUS_PROGRESS: 'progress',
    STATUS_SUCCESS: '成功',
    STATUS_ERROR: '失败',
    STATUS_RETRY: '重试',
    STATUS_REFUSE: '禁止',
  },
  // 错误信息
  error: {
    // 用在捕抓未知异常
    exception: '发生异常，请联系管理员',
    upload: '上传失败',
  },
  // 提示语
  msg: {
    success: '操作成功',
    error: '操作失败',
    confirm_delete: '确定删除？',
    confirm_off: '确定禁用？',
  },
  // 参数校验提示
  validate: {
    key: '{0} 必须设置',
    length: '长度在 {0} 到 {1} 个字符',
  },
  placeholder: {
    name: '请输入名称',
    version: '请输入版本',
    command: '请输入执行 Command',
    docker_file: '请上传 Dockerfile 文件',
    min_mem: '请输入最小内存',
    min_cores: '请输入最小cpu',
    search: '请输入搜索条件',
  },
  graph: {
    single_thread: '单线程',
    multi_thread: '多线程',
    info: '详情',
    input: '输入',
    step: '步骤信息',
    description: '描述',
    Files: '文件',
    app_parameters: '应用参数',
    error: {
      has_issues: '需要处理图形问题',
    },
    cpu_resources: '计算资源',
    SecondaryFiles: '辅助文件',
    AppParameters: '应用参数',
    file: '文件',
    NoAppParams: '没有任何应用参数',
    NoValue: '未为此输入指定任何值',
    Browse: '选择',
    Required: '是否必须',
    Description: '描述',
    Connections: '连接',
    SetValue: '设定值',
    SetNull: '将值设置为null',
    AllowArrayAsSingle: '允许数组作为单个项',
    files_and_metadata: '辅助文件和元数据',
    add_files_and_metadata: '增加辅助文件和元数据',
    add_file: '增加文件',
    directory: '文件夹',
    port_default: '设置执行的默认值',
    port_exposed: '暴露为参数选项，流程运行时可进行编辑',
    port_port: '暴露为画布上的节点，供其它节点连接',
    link_merge_method: '连接合并方法',
    not_connected: '此节点未连接',
    required_not_connected: '此节点(必须)未连接',
    merge_nested: '嵌套',
    merge_flattened: '展开',
    scatter_method: 'Scatter方法',
    no_entries_defined: '未定义任何元数据',
    delete_map_array: '删除映射数组',
    cannot_set_default_file: '无法设置文件类型的默认值。',
    cannot_set_default_directory: '无法为类型目录设置默认值。',
    unknown_input_type: '未知类型',
    type_mismatch: '类型不匹配：此输入的默认步长值为"{0}"类型，但该输入声明为"{1}"。您可以通过单击下方按钮为该输入生成一组新的测试数据。',
  },
}
