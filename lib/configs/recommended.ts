import { Linter } from "eslint"

const config: Linter.Config = {
  plugins: ["@poyoho/config"],
  rules: {
    "@poyoho/config/no-route-query": "error"
  }
}

export = config
