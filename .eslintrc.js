module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier', 'prettier/vue', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'prettier/prettier': 'warn',
    'nuxt/no-cjs-in-config': 'off',
    'vue/no-v-html': 'off',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
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
    {
      files: ['./**/*.d.ts'],
      rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
}
