import { Linter } from "eslint"

const config: Linter.Config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
  },
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    require.resolve("./basejs.js"), // 使用编译后的结果
    "plugin:@typescript-eslint/recommended" // ts默认配置
  ],
  rules: {
  }
}

export = config
