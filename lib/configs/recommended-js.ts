import { Linter } from "eslint"

const config: Linter.Config = {
  extends: [
    require.resolve("./basejs.js"), // 使用编译后的结果
  ],
  rules: {
  }
}

export = config
