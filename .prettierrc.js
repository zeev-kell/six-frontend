module.exports = {
  // 超过最大值换行
  printWidth: 150,
  // 让prettier使用eslint的代码格式进行校验
  eslintIntegration: true,
  // 让prettier使用stylelint的代码格式进行校验
  stylelintIntegration: true,
  // tab键宽度，默认为2
  tabWidth: 2,
  // 行末加分号
  semi: false,
  // 用单引号代替双引号
  singleQuote: true,
  // 对象&数组是否追加空格
  // true: { foo: bar }
  bracketSpacing: true,
  // 箭头函数参数括号 默认avoid 可选 avoid | always
  // avoid 能省略括号的时候就省略 例如x => x
  // always 总是有括号
  arrowParens: 'always',
}
