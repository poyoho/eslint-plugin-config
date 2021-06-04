import { Linter } from "eslint"

const config: Linter.Config = {
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ["@poyoho/config", "vue"],
  extends: [],
  rules: {
    "@poyoho/config/vue/no-route-query": "error"
  }
}

export = config
