/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    globals: {
        defineEmits: 'readonly',
        defineProps: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
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
        '@vue/eslint-config-prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        'vue/require-default-prop': 'off',
        'vue/multi-word-component-names': 'off',
        'no-console': 'warn',
        'prettier/prettier': 'error'
    }
}
