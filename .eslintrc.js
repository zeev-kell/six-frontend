module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'prettier', 'prettier/vue', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'prettier/prettier': 'warn',
    'nuxt/no-cjs-in-config': 'off',
    'vue/no-v-html': 'off',
  },
  overrides: [
    {
      files: ['./assets/iconfont/*.*'],
      rules: {
        'no-unused-expressions': 0,
        'one-var': 0,
        'no-var': 0,
        'no-use-before-define': 0,
        'no-console': 0,
        'no-sequences': 0,
        yoda: 0,
        'no-void': 0,
      },
    },
  ],
}
