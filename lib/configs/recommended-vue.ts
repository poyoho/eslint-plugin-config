import { Linter } from "eslint"

const config: Linter.Config = {
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ["@poyoho/config", "vue"],
  extends: [
    "plugin:vue/recommended" // vue推荐配置
  ],
  rules: { // 自定义插件库推荐配置
    "@poyoho/config/vue/no-route-query": "warn",
    "@poyoho/config/vue/template-function-naming": "warn",
  }
}

export = config
