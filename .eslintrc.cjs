/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        'vue/setup-compiler-macros': true
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/eslint-config-prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'no-loops'
    ],
    rules: {
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'no-console': 1,
        'no-loops/no-loops': 2
    }
}
