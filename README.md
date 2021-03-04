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
