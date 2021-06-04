import { Linter } from "eslint"

const config: Linter.Config = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  plugins: ["@poyoho/config"],
  rules: {
  }
}

export = config
