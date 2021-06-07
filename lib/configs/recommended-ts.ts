import { Linter } from "eslint"

const config: Linter.Config = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: require.resolve("@typescript-eslint/parser"),
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: [
    "@poyoho/config",
    "@typescript-eslint"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended" // ts默认配置
  ],
  rules: {
    "@poyoho/config/js/no-binocular-logic": "warn",
    "@poyoho/config/js/ensure-scope-block": "warn",
  }
}

export = config
