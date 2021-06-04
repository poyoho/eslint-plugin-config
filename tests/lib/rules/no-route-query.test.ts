import { RuleTester } from "eslint"
import noRouteQuery from "../../module/no-route-query"

const ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: { ecmaVersion: 2015 }
})

describe("no-route-query", () => {
  noRouteQuery(ruleTester)
})
