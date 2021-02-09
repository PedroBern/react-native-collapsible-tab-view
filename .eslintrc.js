module.exports = {
  root: true,
  rules: {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 'error',
    // 'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'warn',
    // 'react-native/no-color-literals': 'warn',
    // 'react-native/no-raw-text': 'warn',
    // 'react-native/no-single-element-style-arrays': 'warn',
    'import/no-default-export': 'error',
  },
  plugins: ['react-native-globals', 'react-native'],
  extends: ['universe/native'],
  env: {
    'react-native-globals/all': true,
  },
}
