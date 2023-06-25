/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    plugins: ['@typescript-eslint', 'prettier'],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        'vue/setup-compiler-macros': true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021
    },
    extends: [
        '@vue/eslint-config-prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        'no-console': 'warn',
        'prettier/prettier': 'error',
        semi: ['off', 'awalys'],
        'no-mixed-spaces-and-tabs': 'error',
        'no-alert': 'warn',
        'no-debugger': 'error',
        eqeqeq: 'warn',
        'no-eval': 'error',
        'no-dupe-args': 'error',
        'no-dupe-keys': 'error',
        'no-self-compare': 'error',
        'no-unused-vars': 'off',
        'no-func-assign': 'error',
        indent: ['warn', 4],
        quotes: ['warn', 'single'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off'
    }
}