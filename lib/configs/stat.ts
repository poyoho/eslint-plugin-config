import { Linter } from "eslint"

const config: Linter.Config = {
  plugins: ["@poyoho/config"],
  rules: {
    "@poyoho/config/stat/eslint-disable": "warn"
  }
}

export = config
