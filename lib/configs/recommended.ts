import { Linter } from "eslint"

const config: Linter.Config = {
  plugins: ["hhh"],
  rules: {
    "hhh/no-route-query": "error"
  }
}
export default config
