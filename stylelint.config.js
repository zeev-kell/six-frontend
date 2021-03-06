module.exports = {
  plugins: [
    // add this plugin here:
    'stylelint-scss',
  ],
  extends: ['stylelint-config-standard', 'stylelint-order', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'no-empty-source': null,
    'color-hex-case': null,
    'declaration-colon-newline-after': null,
    'value-list-comma-newline-after': null,
    'at-rule-no-unknown': null,
    'color-hex-length': null,
    'declaration-block-trailing-semicolon': null,
    'rule-empty-line-before': null,
    'comment-whitespace-inside': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    indentation: [
      2,
      {
        severity: 'warning',
      },
    ],
  },
}
