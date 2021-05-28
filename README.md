# six-frontend

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# run by pm2
$ pm2 start npm --name 'six-o-clock' -- run start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## Git commit
```$xslt
<type>(<scope>): <subject>
```

### type
用于说明 commit 的类别，只允许使用下面8个标识。

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动
- build: 本地creator构建

### scope
用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

### subject
是 commit 目的的简短描述，不超过50个字符。

- 以动词开头，使用第一人称现在时，比如change，而不是changed或changes

- 第一个字母小写

- 结尾不加句号（.）

规范参考自阮一峰老师的文章：Commit message 和 Change log 编写指南。

### 项目说明 ###  

#### 文件夹说明 #### 

参考官方 API 文档：[链接](href=https://zh.nuxtjs.org/docs/2.x/directory-structure/nuxt) 

 - Assets : 未编译资源，使用时候需要加入编辑 
 - Components : Vue 组件，分为整个项目公用（common）和其他组件
 - Constants : 系统常量，比如分类类型的下拉选项
 - Content : 未编译资源，暂时没有用到
 - Directives : Vue 指令部分
 - Filters : Vue 管道部分
 - Layouts : 公用布局，可以设置不同的场景布局，如分别设置主页和应用页布局
 - Locales : 中英文翻译文件
 - Middleware ：Nuxt 中间健，可以处理页面切换中逻辑判断等。
 - Modules : Nuxt 的模块化，目前只有 Mock 产生随机数据提供测试
 - Pages : 该文件夹下面的所有 .vue 文件会编译成路由，可以通过地址追加路径访问，为了增加路由的组件，_components 文件夹默认不参与路由设置
 - Plugins : Nuxt 的插件部分，第三方库或者其他代码需要在 Nuxt 实例化时执行。
 - Static : 静态文件，不参与编辑（和Assets的差别）
 - Store : Vuex 的数据存储，目前只保存了用户登录的信息
 - Utils : 一些辅助函数

#### CWL 说明 #### 
依赖库 [cwl-svg](href=https://github.com/rabix/cwl-svg) 

所有组件在 /pages/application/graph ，主入口在 GraphIndex.vue 中
