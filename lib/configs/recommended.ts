import { Linter } from "eslint"

const config: Linter.Config = {
  plugins: ["config"],
  rules: {
    "config/no-route-query": "error"
  }
}

export = config
