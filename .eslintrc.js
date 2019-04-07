module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        mocha: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['error', 4],
        'semi': ['error', 'never'],
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
        'no-restricted-syntax': 'off',
        'no-unused-vars': 'off',
        'no-underscore-dangle': 'off',
        'no-param-reassign': 'off',
        'max-len': 'off',
        'no-return-await': 'off'
    }
}
