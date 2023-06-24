/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    globals: {
        defineEmits: 'readonly',
        defineProps: 'readonly'
    },
    parser: 'vue-eslint-parser',
    plugins: ['@typescript-eslint', 'prettier', 'vue'],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        'vue/setup-compiler-macros': true
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021,
        parser: '@typescript-eslint/parser'
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
        'no-unused-vars': 'warn',
        'no-func-assign': 'error',
        indent: ['warn', 4],
        quotes: ['warn', 'single']
    }
}
