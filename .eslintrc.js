/* eslint-env node */

module.exports = {
    root: true,
    plugins: ['@typescript-eslint', 'prettier', 'vue'],
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021,
        ecmaFeatures: {
            jsx: true,
            globalReturn: false,
            impliedStrict: false
        },
        parser: '@typescript-eslint/parser',
        vueFeatures: {
            filter: true,
            interpolationAsNonHTML: true,
            styleCSSVariableInjection: true,
            customMacros: []
        }
    },
    extends: [
        '@vue/eslint-config-prettier',
        'plugin:vue/vue3-recommended',
        'plugin:vue/essential',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        'no-console': 'warn',
        'prettier/prettier': 'off',
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
        quotes: ['off','single'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-deprecated-slot-attribute': 'off',
        'vue/no-use-v-if-with-v-for': 'off',
        'vue/attribute-hyphenation': 'off'
    }
}
